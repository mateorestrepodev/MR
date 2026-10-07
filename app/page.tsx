import { redirect } from "next/navigation";

export default function RootPage() {
  // Tan pronto como alguien entre a mrtours.co, Next.js ejecutará esto
  // y lo enviará a la velocidad de la luz a la versión en inglés.
  redirect("/en");
}
