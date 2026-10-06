import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Condición 1: Si entran exactamente a la raíz (mrtours.co o mrtours.co/)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  // Condición 2 (Opcional pero recomendada): Si alguien intenta entrar a rutas 
  // que no tienen idioma, los forzamos a pasar por /en.
  // Ignoramos los archivos del sistema, imágenes, y la carpeta public.
  const pathnameHasLocale = pathname.startsWith('/en') || pathname.startsWith('/es')
  const isApiOrPublic = pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')

  if (!pathnameHasLocale && !isApiOrPublic) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  }
}

export const config = {
  // Quitamos la restricción estricta de ['/'] para que el middleware
  // procese todas las rutas (excepto las internas de Next)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}