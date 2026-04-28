import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../images/logoonee.png";

const LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Fleet", href: "#fleet" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <a href="#hero">
            <img
              src={logo}
              alt="Corporate Limo Logo"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transition-all duration-300"
            />
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-10">
            {LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.15em] text-white/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#booking"
              className="border border-primary text-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex flex-col px-6 py-8"
          >
            {/* TOP SECTION */}
            <div className="flex justify-between items-center mb-16">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src={logo}
                  alt="Corporate Limo Logo"
                  className="h-20 w-auto"
                />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col space-y-8 text-center">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <hr className="border-white/20 my-4" />

              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-black py-4 text-sm font-semibold uppercase tracking-[0.2em]"
              >
                Book Now
              </a>

              <a
                href="tel:+12014865369"
                className="flex items-center justify-center text-white/80 hover:text-primary py-4"
              >
                <Phone className="w-5 h-5 mr-3" />
                CALL US NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}