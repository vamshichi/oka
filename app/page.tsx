import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Band from "@/components/Band";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhereWeServe from "@/components/WhereWeServe";
import Partners from "@/components/Partners";
import TicketSection from "@/components/TicketSection";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <About />

      <Band />

      <Partners />

      <Events />

      <TicketSection />

      <WhereWeServe />

      <Contact />

      <Footer />
    </main>
  );
}