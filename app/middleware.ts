import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Si el usuario entra a la raíz exacta (ej. mrtours.co o localhost:3000)
  if (pathname === '/') {
    // Redirigimos automáticamente a la versión en inglés (el estándar internacional)
    // Si prefieres que el default sea español, simplemente cambia '/en' por '/es'
    return NextResponse.redirect(new URL('/en', request.url))
  }
}

export const config = {
  // Aseguramos que el middleware solo escuche la ruta raíz 
  // para no bloquear imágenes, íconos ni rutas que ya existen
  matcher: ['/'],
}