import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Band from "@/components/Band";
import Music from "@/components/Music";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhereWeServe from "@/components/WhereWeServe";
import Partners from "@/components/Partners";
import TicketPrice from "@/components/TicketPrice";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Band />
      {/* <Music /> */}
      <Partners />
      <Events />
      <TicketPrice
        price={249}
        title="General Pass"
        description="Get access to The OAK Project experience."
        buttonText="Get Your Ticket"
        features={[
          "Event entry",
          "Access to live performances",
          "Digital ticket confirmation",
        ]}
      />
      {/* <TicketPrice
        price={499}
        title="VIP Pass"
        description="Experience The OAK Project like never before."
        buttonText="Get Your VIP Ticket"
        features={[
          "All General Pass features",
          "VIP seating",
          "Meet & Greet with the band",
          "Exclusive merchandise",
        ]}
      /> */}
      
      <WhereWeServe />
      <Contact />
      <Footer />
    </main>
  );
}
