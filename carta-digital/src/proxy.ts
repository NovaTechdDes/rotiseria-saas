import { NextRequest, NextResponse } from 'next/server';
const SESSION_COOKIE_NAME = 'auth_session_token';

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // Detectar subdominio
  const [subdomain] = host.split('.');

  if (url.pathname.startsWith('/login')) {
    const isAuthenticated = req.cookies.has(SESSION_COOKIE_NAME);
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/pedidos', req.url));
    }

    return NextResponse.next();
  }

  // Si estamos en localhost o sin subdominio → no hacer nada
  if (host.includes('localhost') && subdomain === 'localhost') {
    return NextResponse.next();
  }

  //Logica de proteccion de rutas En admin podemos entrar solamente si estamos authetincados
  console.log(url.pathname);
  if (url.pathname.startsWith('/admin')) {
    const isAuthenticated = req.cookies.has(SESSION_COOKIE_NAME);
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Si hay subdominio (ej: saborurbano.localhost.com)
  if (host.includes('localhost') && subdomain && subdomain !== 'www') {
    // Reescribimos la URL a /[rotiseria]/...
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
