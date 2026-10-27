import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APP ACA — En mantenimiento",
  description: "Estamos construyendo la nueva versión de la App ACA.",
  robots: { index: false },
};

export default function Mantenimiento() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,24,10,0.18), #0A0A0A 65%)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div
          style={{
            width: 64,
            height: 64,
            margin: "0 auto 22px",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "rgba(232,24,10,0.12)",
            color: "#E8180A",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
          </svg>
        </div>
        <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.3em", color: "#E8180A" }}>APP ACA</p>
        <h1 style={{ margin: "8px 0 14px", fontSize: "clamp(32px, 7vw, 46px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          En mantenimiento
        </h1>
        <p style={{ margin: "0 auto 30px", maxWidth: 400, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
          Estamos construyendo la nueva versión de la App ACA. Muy pronto vuelve con novedades.
        </p>
        <a
          href="https://aivoracreativeagency.com"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            background: "#E8180A",
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: "0.12em",
            textDecoration: "none",
          }}
        >
          IR A AIVORA CREATIVE AGENCY
        </a>
        <p style={{ marginTop: 22, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          ¿Necesitas verificar un certificado?{" "}
          <a href="https://aivoracreativeagency.com/verificar-certificado.html" style={{ color: "#fff", textDecoration: "underline" }}>
            Verifícalo aquí
          </a>
        </p>
      </div>
    </main>
  );
}
