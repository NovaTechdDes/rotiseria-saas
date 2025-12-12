'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const subdomain = hostname.split('.')[0];

  console.log('HOST:', hostname);
  console.log('PATH:', url.pathname);

  // Dominios principales donde SÍ aplica auth
  const isMainDomain = hostname === 'rotiseriasaas.com.ar' || hostname === 'www.rotiseriasaas.com.ar';
  console.log('HostName: ', hostname);

  // 1) Ignorar assets
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api') || url.pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // 2) MANEJO DEL DOMINIO PRINCIPAL (panel, login, admin)
  console.log('isMainDomain: ', isMainDomain);
  if (isMainDomain) {
    console.log('a');
    const isAuthenticated = await verificarSesion();

    // /login
    if (url.pathname.startsWith('/login')) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/pedidos', req.url));
      }
      return NextResponse.next();
    }

    // /admin protegido
    if (url.pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  }

  // 3) SUBDOMINIOS (CARTAS PÚBLICAS)
  // Ej: rotiseriasaas.rotiseriasaas.com.ar → subdomain = rotiseriasaas
  if (subdomain !== 'www' && subdomain !== 'rotiseriasaas' && subdomain.length > 0) {
    // Reescribir hacia /[rotiseria]
    console.log('b');
    const isAuthenticated = await verificarSesion();

    // /login
    if (url.pathname.startsWith('/login')) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/pedidos', req.url));
      }
      return NextResponse.next();
    }

    // /admin protegido
    if (url.pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

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
  const { data } = await supabase.auth.getUser();
  return !!data?.user;
};
