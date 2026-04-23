import Header from '../components/Header';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import WhyUs from '../components/WhyUs';
import Modules from '../components/Modules';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function SalesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <WhyUs />
        <Modules />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
