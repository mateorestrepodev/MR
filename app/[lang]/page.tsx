import Preloader from "@/components/layout/Preloader";
import BookingHero from "@/components/home/BookingHero";
import ToursGrid from "@/components/home/ToursGrid";
import { getDictionary } from "@/app/lib/get-dictionary";

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
      <main className="min-h-screen bg-[#F2F1EC]">
        <BookingHero dict={dict.home} lang={resolvedParams.lang} />

        <ToursGrid
          dict={dict.home.collection}
          toursDict={dict.home.tours}
          customDict={dict.home.custom_tour}
          lang={resolvedParams.lang}
        />
      </main>
    </>
  );
}
