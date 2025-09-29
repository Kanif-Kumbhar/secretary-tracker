import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero />
    </main>
  )
}