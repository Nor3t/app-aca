import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: user.id },
    include: {
      course: true,
      progress: true,
    },
  });

  const totalLessons = enrollment
    ? await prisma.lesson.count({
        where: { module: { courseId: enrollment.courseId } },
      })
    : 0;

  const completedLessons = enrollment?.progress.filter((p) => p.completed).length || 0;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-gray-400 text-sm mb-1">{greeting},</p>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {user.name?.split(" ")[0] || "Estudiante"} 👋
        </h1>
      </div>

      {/* Progress card */}
      {enrollment ? (
        <div className="bg-[#0A0A0A] rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">Tu curso</p>
                <h2 className="text-white text-xl font-bold">{enrollment.course.title}</h2>
              </div>
              <span className="text-4xl font-black text-white/10">{progressPct}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-4">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                {completedLessons} de {totalLessons} lecciones
              </p>
              <a
                href="/dashboard/cursos"
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/20"
              >
                Continuar →
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 mb-8 text-center">
          <p className="text-gray-400 text-sm">No tienes cursos activos todavía.</p>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <a
          href="/dashboard/comunidad"
          className="bg-black text-white rounded-3xl p-6 hover:bg-gray-900 transition-all group"
        >
          <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-bold text-sm">Comunidad</p>
          <p className="text-gray-500 text-xs mt-1">Comparte con otros</p>
        </a>

        <a
          href="/dashboard/certificado"
          className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-3xl p-6 hover:shadow-xl hover:shadow-red-500/20 transition-all"
        >
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="font-bold text-sm">Mi Certificado</p>
          <p className="text-white/70 text-xs mt-1">Ver y descargar</p>
        </a>
      </div>
    </div>
  );
}
