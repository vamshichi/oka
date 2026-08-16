import TicketSection from "@/components/TicketSection";
import Footer from "@/components/Footer";
import NaNvbar from "@/components/Navbar";

export default function TicketsPage() {
  return (
    <main>
      <NaNvbar />
      <div className="bg-[#090909] px-4 py-20 sm:px-6 lg:px-8">
      <TicketSection />
        </div>
      <Footer />
    </main>
  );
}