"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";

export function CertificateView({
  studentName,
  courseTitle,
  code,
  issuedAt,
}: {
  studentName: string;
  courseTitle: string;
  code: string;
  issuedAt: string;
}) {
  function handleDownload() {
    window.print();
  }

  return (
    <div className="space-y-6">
      {/* Certificate card */}
      <div
        id="certificate"
        className="bg-[#0A0A0A] rounded-3xl p-10 relative overflow-hidden border border-white/5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Decorative red line top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-600" />

        {/* Background glow */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-60 h-60 bg-red-500/3 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo + brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <p className="text-white font-bold tracking-widest text-sm">ACA SCHOOL</p>
              <p className="text-gray-600 text-[10px] tracking-widest uppercase">Aivora Creative Agency</p>
            </div>
          </div>

          {/* Certificate title */}
          <p className="text-gray-500 text-xs tracking-[6px] uppercase mb-3">Certificado de Finalización</p>

          {/* Student name */}
          <h2 className="text-white text-4xl font-bold tracking-tight mb-2">{studentName}</h2>
          <p className="text-gray-500 text-sm mb-6">ha completado satisfactoriamente el curso</p>

          {/* Course */}
          <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-2 mb-8">
            <p className="text-red-400 font-bold text-lg tracking-wide">{courseTitle}</p>
          </div>

          {/* Date + code */}
          <div className="flex items-end justify-between border-t border-white/5 pt-6">
            <div>
              <p className="text-gray-600 text-xs mb-1">Emitido el</p>
              <p className="text-white text-sm font-semibold">
                {format(new Date(issuedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs mb-1">Código de verificación</p>
              <p className="text-red-400 font-mono font-bold text-sm tracking-widest">{code}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 bg-black text-white font-bold py-3 rounded-2xl hover:bg-gray-900 transition-all text-sm"
        >
          Descargar PDF
        </button>
        <button
          onClick={() => {
            const url = `${window.location.origin}/verificar?code=${code}`;
            navigator.clipboard.writeText(url);
          }}
          className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-all text-sm"
        >
          Copiar enlace de verificación
        </button>
      </div>

      {/* Verify link */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-green-500 text-lg">✓</span>
        <div>
          <p className="text-green-800 font-semibold text-sm">Certificado verificable</p>
          <p className="text-green-600 text-xs mt-0.5">
            Cualquier persona puede verificar la autenticidad en{" "}
            <a
              href={`/verificar?code=${code}`}
              className="underline font-semibold"
              target="_blank"
            >
              aivoracreativeagency.com/verificar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
