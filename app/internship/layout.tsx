import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '../fragranza/components/Header';
import Footer from '../fragranza/components/Footer';

export const metadata: Metadata = {
  title: 'Internship Program | Career Opportunities',
  description: 'Join our comprehensive internship program. Opportunities in Computer Science, Marketing, HR, and Administration.',
};

export default function InternshipLayout({ children }: { children: ReactNode }) {
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
