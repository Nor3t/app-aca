import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { issueCertificate } from "@/lib/certificates";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { enrollmentId, lessonId } = await req.json();
  const user = session.user as any;

  await prisma.progress.upsert({
    where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { enrollmentId, lessonId, completed: true, completedAt: new Date() },
  });

  // Check if course is 100% complete
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: {
        include: {
          modules: { include: { lessons: true } },
        },
      },
      progress: { where: { completed: true } },
    },
  });

  if (enrollment) {
    const totalLessons = enrollment.course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = enrollment.progress.length;

    if (totalLessons > 0 && completedLessons >= totalLessons) {
      // Mark enrollment as completed
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { status: "COMPLETED", completedAt: new Date() },
      });

      // Issue certificate if not already issued
      const existingCert = await prisma.certificate.findFirst({
        where: { userId: user.id },
      });

      if (!existingCert) {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        await issueCertificate(
          user.id,
          enrollment.course.title,
          dbUser?.name || user.name || "Estudiante"
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
