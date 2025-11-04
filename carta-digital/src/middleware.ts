import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const host = req.headers.get("host") || "";


    // Detectar subdominio
    const [subdomain] = host.split(".");

    if (url.pathname.startsWith('/login') || url.pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Si estamos en localhost o sin subdominio → no hacer nada
    if (host.includes("localhost") && subdomain === "localhost") {
        return NextResponse.next();
    }

    // Si hay subdominio (ej: saborurbano.localhost.com)
    if (host.includes("localhost") && subdomain && subdomain !== "www") {
        // Reescribimos la URL a /[rotiseria]/...
        url.pathname = `/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};
