import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plataforma ACA — En mantenimiento",
  description: "Estamos construyendo la nueva versión de la Plataforma ACA.",
  robots: { index: false },
};

const css = `
.mant{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:center;overflow:hidden;color:#fff;background:#0A0A0A url("/mantenimiento-fondo.jpg") 70% center/cover no-repeat}
.mant::before{content:"";position:absolute;inset:0;background:
  linear-gradient(90deg,rgba(8,8,8,.94) 0%,rgba(8,8,8,.82) 34%,rgba(8,8,8,.35) 62%,rgba(8,8,8,.15) 100%),
  linear-gradient(0deg,rgba(8,8,8,.7) 0%,transparent 40%)}
.mant-in{position:relative;width:100%;max-width:1200px;margin:0 auto;padding:48px clamp(20px,5vw,72px)}
.mant-box{max-width:660px}
.mant-ico{width:58px;height:58px;display:grid;place-items:center;border-radius:50%;background:rgba(232,24,10,.16);color:#E8180A;margin-bottom:22px}
.mant-k{font-size:13px;font-weight:800;letter-spacing:.32em;color:#E8180A}
.mant h1{margin:10px 0 16px;font-size:clamp(40px,7vw,72px);font-weight:900;line-height:.98;letter-spacing:-.03em}
.mant p{margin:0 0 34px;max-width:440px;font-size:17px;line-height:1.6;color:rgba(255,255,255,.78)}
.mant-btns{display:flex;flex-wrap:wrap;gap:12px}
.mant-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:56px;padding:0 28px;font-size:14px;font-weight:800;letter-spacing:.12em;text-decoration:none;transition:background .2s,border-color .2s,transform .2s}
.mant-btn:hover{transform:translateY(-1px)}
.mant-btn.r{background:#E8180A;color:#fff}
.mant-btn.r:hover{background:#c00000}
.mant-btn.o{border:1.5px solid rgba(255,255,255,.55);color:#fff;background:rgba(255,255,255,.04);backdrop-filter:blur(6px)}
.mant-btn.o:hover{border-color:#fff;background:rgba(255,255,255,.1)}
.mant-btn svg{width:18px;height:18px;flex:none}
@media (max-width:760px){
  .mant{align-items:flex-end;background-position:62% center}
  .mant::before{background:linear-gradient(0deg,rgba(8,8,8,.96) 0%,rgba(8,8,8,.85) 45%,rgba(8,8,8,.25) 80%,rgba(8,8,8,.1) 100%)}
  .mant-in{padding-bottom:40px}
  .mant-btn{width:100%}
}
`;

export default function Mantenimiento() {
  return (
    <main className="mant">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="mant-in">
        <div className="mant-box">
          <div className="mant-ico" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
            </svg>
          </div>
          <div className="mant-k">PLATAFORMA ACA</div>
          <h1>En mantenimiento</h1>
          <p>Estamos construyendo la nueva versión de la Plataforma ACA. Muy pronto vuelve con novedades.</p>
          <div className="mant-btns">
            <a className="mant-btn r" href="https://aivoracreativeagency.com/?skip=1#hero">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              REGRESAR AL INICIO
            </a>
            <a className="mant-btn o" href="https://aivoracreativeagency.com/verificar-certificado.html">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="6" /><path d="M8.2 13.2 7 22l5-3 5 3-1.2-8.8" /></svg>
              VERIFICAR UN CERTIFICADO
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
