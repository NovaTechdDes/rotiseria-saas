'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // Detectar subdominio
  const [subdomain] = host.split('.');

  if (url.pathname.startsWith('/login')) {
    if (await verificarSesion()) {
      return NextResponse.redirect(new URL('/admin/pedidos', req.url));
    }

    return NextResponse.next();
  }

  // Si estamos en localhost o sin subdominio → no hacer nada
  if (host.includes('localhost') && subdomain === 'localhost') {
    return NextResponse.next();
  }

  //Logica de proteccion de rutas En admin podemos entrar solamente si estamos authetincados
  if (url.pathname.startsWith('/admin')) {
    if (!(await verificarSesion())) {
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

const verificarSesion = async () => {
  const supabase = await createClient();
  const { data } = (await supabase.auth.getUser()) || false;
  let isAuthenticated = false;

  if (data.user) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  return isAuthenticated;
};
