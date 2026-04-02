import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGallerySection from './components/ProductGallerySection';
import StorySection from './components/StorySection';
import IngredientsSection from './components/IngredientsSection';
import BlogSection from './components/BlogSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

export const metadata = {
  title: 'Fragranza Olio - Premium Artisanal Fragrances',
  description: 'Discover handcrafted luxury fragrances made with premium ingredients. Experience timeless elegance with Fragranza Olio.',
};

export default function FragranzaPage() {
  return (
    <div className="w-full bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <ProductGallerySection />
        <StorySection />
        <IngredientsSection />
        <BlogSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
