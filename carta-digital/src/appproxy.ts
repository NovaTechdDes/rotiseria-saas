/*'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // Detectar subdominio
  const subdomain = host.split('.')[0].split(':')[0];

  const isAuthenticated = await verificarSesion();

  if (url.pathname.startsWith('/login')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/pedidos', req.url));
    }

    return NextResponse.next();
  }

  //Logica de proteccion de rutas En admin podemos entrar solamente si estamos authetincados
  if (url.pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  const isLocalhost = host.includes('localhost');
  console.log({ isLocalhost, subdomain });
  // Si estamos en localhost o sin subdominio → no hacer nada
  if (isLocalhost && subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
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
  return !!data.user;
};
*/
