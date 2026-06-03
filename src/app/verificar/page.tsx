"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function VerificarPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);

    const res = await fetch(`/api/certificados/verificar?code=${encodeURIComponent(code.trim())}`);
    if (res.ok) {
      const data = await res.json();
      setResult(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900 tracking-widest text-sm">ACA SCHOOL</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Verificar Certificado
            </h1>
            <p className="text-gray-400 text-sm">
              Ingresa el código del certificado para confirmar su autenticidad
            </p>
          </div>

          <form onSubmit={handleVerify} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ACA-2026-XXXXXX"
                className="flex-1 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-mono text-center tracking-widest focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white font-bold px-6 py-3.5 rounded-2xl hover:bg-gray-800 transition-all disabled:opacity-50 text-sm"
              >
                {loading ? "..." : "Verificar"}
              </button>
            </div>
          </form>

          {/* Valid certificate */}
          {result && (
            <div className="bg-[#0A0A0A] rounded-3xl p-8 relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-600" />
              <div className="absolute top-4 right-4">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                  ✓ VÁLIDO
                </span>
              </div>
              <div className="pt-4">
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">Certificado Verificado</p>
                <h2 className="text-white text-2xl font-bold mb-1">{result.studentName}</h2>
                <p className="text-gray-500 text-sm mb-4">completó el curso</p>
                <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 mb-6">
                  <p className="text-red-400 font-bold">{result.courseTitle}</p>
                </div>
                <div className="flex items-end justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Fecha de emisión</p>
                    <p className="text-white text-sm font-semibold">
                      {format(new Date(result.issuedAt), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-xs mb-1">Código</p>
                    <p className="text-red-400 font-mono font-bold text-sm">{result.code}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Not found */}
          {notFound && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center animate-fade-in">
              <p className="text-red-400 text-4xl mb-3">✗</p>
              <h3 className="font-bold text-red-700 mb-1">Certificado no encontrado</h3>
              <p className="text-red-400 text-sm">
                El código ingresado no corresponde a ningún certificado válido de ACA School.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
