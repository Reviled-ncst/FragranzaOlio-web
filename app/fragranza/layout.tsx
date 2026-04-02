import type { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function FragranzaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-20">
        {children}
      </div>
      <Footer />
    </>
  );
}
