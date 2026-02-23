import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#141414] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-primary/20 translate-x-4 translate-y-4 -z-10" />
            {/* about section luxury chauffeur opening door */}
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop"
              alt="Professional Chauffeur"
              className="w-full h-auto object-cover grayscale-[30%] contrast-125"
            />
          </motion.div>

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
              Founded on the principles of punctuality, privacy, and prestige, Airclass provides Boonton, NJ and the surrounding metropolitan area with unparalleled black car service. 
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
              Whether you are attending a crucial corporate meeting, requiring an elegant airport transfer, or enjoying a night out, our meticulously maintained fleet and rigorously trained chauffeurs ensure an exceptional journey.
            </p>
            <a
              href="#fleet"
              className="inline-flex items-center text-white text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors group pb-2 border-b border-white/20 hover:border-primary"
            >
              Discover Our Fleet
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
