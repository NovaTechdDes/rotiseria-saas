import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const host = req.headers.get('host') || "";
    const [subdomain] = host.split('.');
    console.log("a")

    if (subdomain === 'localhost' || host.startsWith('localhost')) {
        return NextResponse.next();
    };

    if (subdomain && subdomain !== 'www') {
        url.pathname = `/${subdomain}`;
        return NextResponse.rewrite(url);
    };

    return NextResponse.next();
}

export const config = {
    matcher: ["/"], // solo aplica al index
};