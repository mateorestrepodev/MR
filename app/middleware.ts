import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 1. Definimos los idiomas que soportamos
const locales = ['en', 'es'];
const defaultLocale = 'en'; // Inglés por defecto para mercado USA/PR

// 2. Función para obtener el idioma preferido del usuario
function getLocale(request: NextRequest): string {
  // Obtenemos los headers de idioma del navegador del usuario
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    // Busca el mejor match entre lo que quiere el usuario y lo que tenemos
    return matchLocale(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

// 3. La lógica principal del Middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar las rutas de archivos públicos (logo, imágenes de tours, etc.)
  // Si no pones esto, el middleware intentará traducir tu logo.svg
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logo') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Verifica si el pathname ya tiene un idioma (ej: /es/tours o /en/tours)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return; // Si ya tiene idioma, lo dejamos pasar normal

  // Si no tiene idioma (ej: entra a tusitio.com/), lo redirigimos al idioma detectado
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Hacemos la redirección (ej: tusitio.com -> tusitio.com/en)
  return NextResponse.redirect(request.nextUrl);
}

// 4. Configuración para decirle al middleware en qué rutas ejecutarse
export const config = {
  // Matchea todas las rutas excepto api, _next/static, _next/image y favicon
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};