import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GlitchFrame from '@/components/effects/GlitchFrame';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <GlitchFrame enableScanlines enableNoise className="min-h-screen flex flex-col">
      <Nav />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </GlitchFrame>
  );
}
