import { useState } from "react";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, X } from "lucide-react";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      {/* Footer */}
      <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

            {/* Branding + Socials */}
            <div className="col-span-1 lg:col-span-2">
              <h2 className="font-serif text-3xl tracking-widest text-yellow-400 mb-6">
                AIRCORPORATE  LIMO
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                Experience the pinnacle of luxury transportation in Boonton, NJ and beyond. Punctual, discreet, and exceptionally comfortable.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Business & Corporate Travel</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Airport Transfers</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Hourly Rides</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Weddings</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Proms</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">NYC Nights Out</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Contact</h4>
              <ul className="space-y-5 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
                  <span>Boonton, <br/> NJ 07005</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3 shrink-0" />
                  <a href="tel:+12014865369" className="hover:text-primary transition-colors">+1 201-486-5369</a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3 shrink-0" />
                  <a href="mailto:Aircorplimo@yahoo.com" className="hover:text-primary transition-colors">Aircorplimo@yahoo.com</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()}  Aircorporate Limo Service. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111] max-w-3xl w-full rounded-xl p-8 relative overflow-y-auto max-h-[80vh]">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-4 right-4 text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-serif text-white mb-6">Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aircorporate Limo Service
            </p>
            <p className="text-muted-foreground mb-4">
              We are committed to protect your privacy. We collect personal information such as your name, phone number, email address, pickup and drop-off details, and payment information solely to process reservations and provide our transportation services.
            </p>
            <p className="text-muted-foreground mb-4">
              We do not sell, rent, or share your personal information with third parties except as necessary to complete your booking or comply with legal obligations. Payment information is processed securely and is not stored on our servers.
            </p>
            <p className="text-muted-foreground mb-4">
              We take reasonable measures to safeguard your information and ensure it is protected.
            </p>
            <p className="text-muted-foreground mb-4">
              For any questions regarding this Privacy Policy, please contact Aircorporate Limo Service directly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}