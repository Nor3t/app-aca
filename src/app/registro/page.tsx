"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al crear la cuenta.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "5rem", lineHeight: 1, color: "#E50000", letterSpacing: "4px" }}>ACA</div>
          <div style={{ width: "100%", height: "2px", background: "#E50000", margin: "6px 0 4px 0" }}></div>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "0.75rem", letterSpacing: "8px", color: "#E50000" }}>AIVORA CREATIVE AGENCY</div>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-4">Crear cuenta</h1>
          <p className="text-gray-500 mt-1 text-sm">Únete a la plataforma</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
            />

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all duration-200 disabled:opacity-50 text-sm tracking-wide"
            >
              {loading ? "Creando cuenta..." : "REGISTRARSE"}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/login" className="text-gray-500 text-xs hover:text-white transition-colors">
              ¿Ya tienes cuenta? Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
