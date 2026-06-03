import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const cert = await prisma.certificate.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    studentName: cert.studentName,
    courseTitle: cert.courseTitle,
    code: cert.code,
    issuedAt: cert.issuedAt.toISOString(),
  });
}
