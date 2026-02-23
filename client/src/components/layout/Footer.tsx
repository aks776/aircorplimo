import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative subtle gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-serif text-3xl tracking-widest text-white mb-6">
              AIRC<span className="text-primary">LASS</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              Experience the pinnacle of luxury transportation in Boonton, NJ and beyond. Punctual, discrete, and exceptionally comfortable.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Airport Transfers</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Corporate Travel</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Hourly Chauffeur</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Special Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Contact</h4>
            <ul className="space-y-5 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
                <span>123 Luxury Lane<br/>Boonton, NJ 07005</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 shrink-0" />
                <a href="mailto:booking@airclass.com" className="hover:text-primary transition-colors">booking@airclass.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Airclass Premium Transportation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
