import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import HomeInteractions from "@/components/HomeInteractions";

// Mantém a estrutura da página no servidor e reserva o estado client para as interações necessárias.
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030303] font-sans text-slate-200">
      <HomeInteractions />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[30%] h-[70%] w-[70%] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div className="absolute -bottom-[20%] -right-[15%] h-[60%] w-[60%] rounded-full bg-purple-600/[0.08] blur-[140px]" />
        <div className="absolute right-[10%] top-[40%] h-[30%] w-[30%] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <Header />

      <main>
        <Hero />
        <InfiniteMarquee />
        <Stats />
        <Services />
        <Projects />
        <TechStack />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
