"use client";

import { useState } from "react";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "5rem", lineHeight: 1, color: "#E50000", letterSpacing: "4px" }}>ACA</div>
          <div style={{ width: "100%", height: "2px", background: "#E50000", margin: "6px 0 4px 0" }}></div>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "0.75rem", letterSpacing: "8px", color: "#E50000" }}>AIVORA CREATIVE AGENCY</div>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-4">Recuperar acceso</h1>
          <p className="text-gray-500 mt-1 text-sm">Te enviaremos instrucciones por correo</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center">
              <p className="text-white text-sm">✅ Revisa tu correo para restablecer tu contraseña.</p>
              <a href="/login" className="text-red-500 text-xs mt-4 block hover:underline">Volver al inicio</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all text-sm tracking-wide"
              >
                ENVIAR INSTRUCCIONES
              </button>
              <div className="text-center">
                <a href="/login" className="text-gray-500 text-xs hover:text-white transition-colors">Volver al inicio</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
