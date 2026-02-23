import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Fleet", href: "#fleet" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="group">
            <h1 className="font-serif text-2xl tracking-widest text-white group-hover:text-primary transition-colors duration-300">
              AIRC<span className="text-primary">LASS</span>
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.15em] text-white/80 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-6">
            <a
              href="#booking"
              className="hidden md:flex items-center border border-primary/50 text-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all duration-300"
            >
              Book Now
            </a>
            
            <a href="tel:+15551234567" className="hidden lg:flex items-center text-white hover:text-primary transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wider">CALL US</span>
            </a>

            <button
              className="md:hidden text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#141414] flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-16">
              <h1 className="font-serif text-2xl tracking-widest text-white">
                AIRC<span className="text-primary">LASS</span>
              </h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-primary"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif tracking-wider text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10 my-4" />
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-primary text-black py-4 text-sm font-semibold uppercase tracking-[0.2em]"
              >
                Book Now
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center justify-center text-white/70 hover:text-primary py-4"
              >
                <Phone className="w-5 h-5 mr-3" />
                <span className="tracking-widest">CALL US NOW</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
