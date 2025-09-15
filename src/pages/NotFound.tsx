import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-matte-black">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-editorial text-6xl sm:text-8xl text-silver mb-4">404</h1>
          <p className="font-minimal text-xl text-ghost-white/80 mb-8">Oops! Page not found</p>
          <a 
            href="/" 
            className="inline-block px-8 py-4 bg-matte-black border border-silver/30 text-ghost-white font-minimal text-sm tracking-widest uppercase hover:border-silver/50 hover:text-silver transition-all duration-500 rounded-lg"
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
