import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CertificateView } from "@/components/CertificateView";

export default async function CertificadoPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const cert = await prisma.certificate.findFirst({
    where: { userId: user.id },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-10 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mi Certificado</h1>
        <p className="text-gray-400 text-sm mt-1">Tu logro oficial de ACA School</p>
      </div>

      {cert ? (
        <CertificateView
          studentName={cert.studentName}
          courseTitle={cert.courseTitle}
          code={cert.code}
          issuedAt={cert.issuedAt.toISOString()}
        />
      ) : (
        <div className="bg-gray-50 rounded-3xl p-10 text-center border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="font-bold text-gray-700 mb-2">Aún no tienes certificado</h2>
          <p className="text-gray-400 text-sm">
            Completa el 100% del curso para obtener tu certificado oficial con código único verificable.
          </p>
        </div>
      )}
    </div>
  );
}
