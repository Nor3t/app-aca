"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background grain */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mb-4">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
            <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "5rem", lineHeight: 1, color: "#E50000", letterSpacing: "4px", textShadow: "3px 3px 0 rgba(0,0,0,0.4)" }}>ACA</div>
            <div style={{ width: "100%", height: "2px", background: "#E50000", margin: "6px 0 4px 0" }}></div>
            <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "0.75rem", letterSpacing: "8px", color: "#E50000" }}>AIVORA CREATIVE AGENCY</div>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-4">Bienvenido</h1>
          <p className="text-gray-500 mt-1 text-sm">Accede a tu plataforma de formación</p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-2xl hover:bg-gray-100 transition-all duration-200 mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">o con tu correo</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:bg-white/8 transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
            >
              {loading ? "Entrando..." : "ENTRAR"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <a href="/registro" className="text-gray-500 text-xs hover:text-white transition-colors">
              Crear cuenta
            </a>
            <a href="/recuperar" className="text-gray-500 text-xs hover:text-white transition-colors">
              Olvidé mi contraseña
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
