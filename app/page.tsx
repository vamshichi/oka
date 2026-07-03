import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Band from "@/components/Band";
import Music from "@/components/Music";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhereWeServe from "@/components/WhereWeServe";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Band />
      {/* <Music /> */}
      <Events />
      <WhereWeServe />
      <Contact />
      <Footer />
    </main>
  );
}
