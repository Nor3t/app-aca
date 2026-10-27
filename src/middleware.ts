import { NextResponse, type NextRequest } from "next/server";

// Letrero de "En mantenimiento" (26-oct-2026): mientras se construye la nueva versión de la app,
// nadie entra. Solo aplica en la versión publicada en Vercel; en tu compu la app funciona normal.
// Para quitarlo: en Vercel pon la variable MANTENIMIENTO=0 y vuelve a publicar (o borra este archivo).
// Acceso del dueño: abre la app con ?acceso=<MANTENIMIENTO_CLAVE> y ese navegador queda desbloqueado.

const LIBRES = ["/mantenimiento", "/verificar", "/api/certificados", "/api/chat/cleanup"];
const COOKIE = "aca_acceso";

export function middleware(req: NextRequest) {
  if (process.env.VERCEL_ENV !== "production" || process.env.MANTENIMIENTO === "0") return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;
  const clave = process.env.MANTENIMIENTO_CLAVE;

  if (clave && searchParams.get("acceso") === clave) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("acceso");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, clave, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 90 });
    return res;
  }
  if (clave && req.cookies.get(COOKIE)?.value === clave) return NextResponse.next();

  if (LIBRES.some((p) => pathname === p || pathname.startsWith(p + "/"))) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "La Plataforma ACA está en mantenimiento" }, { status: 503 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/mantenimiento";
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?)$).*)"],
};
