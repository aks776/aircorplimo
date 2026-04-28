import { motion } from "framer-motion";
import aboutImg from '../../images/about.webp'; // ✅ Local import

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#141414] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-primary/20 translate-x-4 translate-y-4 -z-10" />
            <img
              src={aboutImg} // ✅ Use local image
              alt="Professional Chauffeur"
              className="w-full h-auto object-cover grayscale-[30%] contrast-125"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pl-0 lg:pl-10"
          >
            <h4 className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Our Standard
            </h4>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-8 leading-tight">
              Redefining the <br /> <span className="italic text-white/70">Art of Travel</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
              At Aircorporate Limo Service, we bring over 20 years of experience in delivering dependable, luxury transportation throughout New Jersey and New York. Our reputation is built on punctuality, professionalism, and exceptional customer care.
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
              We specialize in corporate travel, airport transfers, weddings, proms, and special events, providing safe, comfortable, and first-class service every time. Our experienced chauffeurs and meticulously maintained fleet ensure a smooth and stress-free experience from start to finish.
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
              At Aircorporate Limo Service, we don’t just provide transportation, we provide reliability, comfort, and peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="#fleet"
                className="inline-flex items-center text-white text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors group pb-2 border-b border-white/20 hover:border-primary"
              >
                Discover Our Fleet
              </a>

              <a
                href="#booking"
                className="inline-flex items-center text-black bg-primary px-6 py-3 text-sm uppercase tracking-widest font-medium rounded hover:bg-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}