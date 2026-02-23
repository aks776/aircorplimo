import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Fleet } from "@/components/sections/Fleet";
import { BookingSection } from "@/components/sections/BookingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <BookingSection />
      <Fleet />
      <Footer />
    </main>
  );
}
