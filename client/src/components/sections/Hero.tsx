import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// ✅ Local images
import slide1 from '../../images/herothree.png';
import slide2 from '../../images/herotwo.png';
import slide3 from '../../images/hero.webp';

const slides = [
  {
    image: slide1,
    tagline: "Luxury. Comfort. Class.",
    title: "Premium Black Car Service",
    subtitle: "Experience executive transportation designed for those who expect nothing less than excellence.",
  },
  {
    image: slide2,
    tagline: "Business Travel, Perfected.",
    title: "Airport and Corporate Travels",
    subtitle: "On-time arrivals, real-time flight tracking, and professional chauffeurs at your service.",
  },
  {
    image: slide3,
    tagline: "Anytime. Anywhere.",
    title: "Luxury Rides Across NJ and NYC",
    subtitle: "From weddings to nights out, travel in unmatched comfort and refined style.",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: index === currentIndex ? 1 : 0, scale: index === currentIndex ? 1 : 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/50 to-[#141414] z-10" />
          <img
            src={slide.image}
            alt="Luxury Transportation"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center mt-16">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            {slides[currentIndex].tagline}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
            {slides[currentIndex].title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-12 mx-auto">
            {slides[currentIndex].subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#booking"
              className="group flex items-center justify-center bg-primary text-black px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
            >
              Reserve Now
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#services"
              className="flex items-center justify-center bg-transparent border border-white/30 text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-300"
            >
              Explore Services
            </a>

            <a
              href="tel:+12014865369"
              className="flex items-center justify-center bg-green-600 text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-green-500 transition-all duration-300"
            >
              Call Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}