import { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailView from "@/components/tours/TourDetailView";
import { getDictionary } from "@/app/lib/get-dictionary";

interface TourDataDef {
  image_count?: number;
  title: string;
  description: string;
  duration: string;
  includes: string[];
  price: number;
  book_button: string;
  back_button: string;
  about_title: string;
  includes_title: string;
  duration_label: string;
  fee_note: string;
}

// 1. GENERAMOS LOS METADATOS ESPECÍFICOS DEL TOUR (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "es"; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;
  const dict = await getDictionary(lang);

  const rawTourData =
    dict.home.tour_details[id as keyof typeof dict.home.tour_details];

  if (!rawTourData) {
    return { title: "Tour Not Found | MR Medellin Private Tours" };
  }

  const tourData = rawTourData as TourDataDef;

  return {
    title: `${tourData.title} | MR Medellin Private Tours`,
    description: tourData.description,
    openGraph: {
      title: `${tourData.title} | Private Experience`,
      description: tourData.description,
      images: [`/tours/${id}/${id}1.webp`], // Carga la portada del tour al compartir el link
    },
  };
}

// 2. COMPONENTE PRINCIPAL DE LA PÁGINA
export default async function TourPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es"; id: string }>;
}) {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;

  const dict = await getDictionary(lang);
  const rawTourData =
    dict.home.tour_details[id as keyof typeof dict.home.tour_details];

  if (!rawTourData) {
    notFound();
  }

  const tourData = rawTourData as TourDataDef;
  const imageCount = tourData.image_count || 5;

  const images = Array.from(
    { length: imageCount },
    (_, i) => `/tours/${id}/${id}${i + 1}.webp`,
  );

  return (
    <div className="w-full">
      <TourDetailView tour={tourData} images={images} lang={lang} />
    </div>
  );
}
