import Header from './fragranza/components/Header';
import HeroSection from './fragranza/components/HeroSection';
import ProductGallerySection from './fragranza/components/ProductGallerySection';
import StorySection from './fragranza/components/StorySection';
import IngredientsSection from './fragranza/components/IngredientsSection';
import BlogSection from './fragranza/components/BlogSection';
import TestimonialsSection from './fragranza/components/TestimonialsSection';
import Footer from './fragranza/components/Footer';

export const metadata = {
  title: 'Fragranza Olio - Premium Artisanal Fragrances',
  description: 'Discover handcrafted luxury fragrances made with premium ingredients. Experience timeless elegance with Fragranza Olio.',
};

export default function Home() {
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
