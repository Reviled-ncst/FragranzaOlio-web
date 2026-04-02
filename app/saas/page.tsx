import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata = {
  title: 'Advanced Analytics Platform - Drive Business Growth',
  description: 'Transform raw data into actionable insights with our AI-powered analytics platform.',
};

export default function SaaSHome() {
  return (
    <div className="w-full bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
