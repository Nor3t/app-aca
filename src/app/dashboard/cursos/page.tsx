import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LessonPlayer } from "@/components/LessonPlayer";

export default async function CursosPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: user.id },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: { orderBy: { order: "asc" } },
            },
          },
        },
      },
      progress: true,
    },
  });

  if (!enrollment) {
    return (
      <div className="p-6 lg:p-10 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mi Curso</h1>
        <div className="bg-gray-50 rounded-3xl p-10 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">No tienes cursos activos.</p>
        </div>
      </div>
    );
  }

  const completedIds = new Set(
    enrollment.progress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  const totalLessons = enrollment.course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedIds.size;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{enrollment.course.title}</h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 max-w-xs h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 font-semibold">{progressPct}% completado</span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-8 max-w-3xl">
        {enrollment.course.modules.map((module) => (
          <div key={module.id}>
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
              {module.title}
            </h2>
            <div className="space-y-3">
              {module.lessons.map((lesson) => {
                const done = completedIds.has(lesson.id);
                return (
                  <LessonPlayer
                    key={lesson.id}
                    lesson={{ id: lesson.id, title: lesson.title, videoUrl: lesson.videoUrl, duration: lesson.duration }}
                    enrollmentId={enrollment.id}
                    completed={done}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
