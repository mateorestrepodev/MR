import Preloader from "@/components/layout/Preloader";
import BookingHero from "@/components/home/BookingHero";
import ToursGrid from "@/components/home/ToursGrid";
import { getDictionary } from "@/app/lib/get-dictionary";
import CustomItineraryModal from "@/components/home/CustomItineraryModal";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);

  return (
    <>
      <Preloader />
      <main className="min-h-screen bg-[#F2F1EC] relative">
        <BookingHero dict={dict.home} lang={resolvedParams.lang} />

        <ToursGrid
          dict={dict.home.collection}
          toursDict={dict.home.tours}
          customDict={dict.home.custom_tour}
          lang={resolvedParams.lang}
        />

        {/* Modal de Itinerario Personalizado (Aparece a los 5 segundos) */}
        <CustomItineraryModal
          dict={dict.home.modal}
          lang={resolvedParams.lang}
        />
      </main>
    </>
  );
}
