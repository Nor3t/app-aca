import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folio = searchParams.get("folio") || searchParams.get("code");

  if (!folio) return NextResponse.json({ valid: false }, { headers: CORS });

  const cert = await prisma.certificate.findUnique({
    where: { code: folio.toUpperCase() },
    include: { user: { select: { name: true, image: true } } },
  });

  if (!cert) return NextResponse.json({ valid: false }, { headers: CORS });

  return NextResponse.json({
    valid: true,
    nombre: cert.studentName,
    foto: cert.user?.image || null,
    curso: cert.courseTitle,
    folio: cert.code,
    fecha: new Date(cert.issuedAt).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" }),
    duracion: "2 meses",
    pdfUrl: cert.pdfUrl || null,
    aval: "Aivora Creative Agency certifica que el presente estudiante completó el programa ACA School, demostrando dominio en producción visual, creación de contenido UGC, estrategia de marca y desarrollo de campañas para marcas a nivel profesional.",
  }, { headers: CORS });
}
