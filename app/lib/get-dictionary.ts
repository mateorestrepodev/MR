import 'server-only';

// Definimos los tipos de diccionarios que cargaremos de forma perezosa (lazy load)
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

// Esta función la llamaremos desde nuestros componentes de servidor (Pages)
export const getDictionary = async (locale: 'en' | 'es') => {
  // Si el idioma no es válido, carga inglés por defecto
  return dictionaries[locale]?.() ?? dictionaries.en();
};