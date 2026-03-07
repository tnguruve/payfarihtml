import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="grid-bg">
        <Hero />
      </div>
      <FeaturesSection />
      <CTASection />

      <Footer />
    </main>
  );
}
