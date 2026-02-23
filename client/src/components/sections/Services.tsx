import { motion } from "framer-motion";
import { Plane, Briefcase, Clock } from "lucide-react";

const SERVICES = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Seamless travel to and from all major airports. Includes real-time flight tracking and a complimentary 60-minute wait time.",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Reliable and discreet transportation for executives. A quiet environment to work, relax, or prepare for your next meeting.",
  },
  {
    icon: Clock,
    title: "Hourly Chauffeur",
    description: "Total flexibility with an on-call chauffeur. Includes 15-minute grace period and free cancellation up to 2 hours before pickup.",
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-card relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4"
          >
            Excellence in Motion
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl text-white mb-6"
          >
            Our Premium Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group bg-[#141414] border border-white/5 p-10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
