import { motion } from "framer-motion";
import { Plane, Briefcase, Clock, Heart, Music, Car } from "lucide-react";
// ✅ Updated image imports
import airportImg from '../../images/airportserv.webp';
import hourlyImg from '../../images/hourlytravel.jpeg';
import weddingImg from '../../images/wedding.jpeg';
import promImg from '../../images/porms.jpg';
import nightImg from '../../images/nightout.jpeg';
import corporateImg from '../../images/client.jpg';

const SERVICES = [
  {
    icon: Briefcase,
    title: "Business and Corporate Travel",
    description: "Professional transportation for executives, meetings, conferences, and corporate events. Reliable, discreet, and always on time.",
    image: corporateImg,
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "On-time pickups and drop-offs to and from all major NY and NJ airports. Flight tracking included for smooth arrivals.",
    image: airportImg,
  },
  {
    icon: Clock,
    title: "Hourly Rides",
    description: "Flexible hourly bookings for meetings, events, or city travel. Your chauffeur stays with you as needed.",
    image: hourlyImg,
  },
  {
    icon: Heart,
    title: "Weddings",
    description: "Elegant and dependable transportation for your special day. Perfect coordination for the bride, groom, and guests.",
    image: weddingImg,
  },
  {
    icon: Music,
    title: "Proms",
    description: "Safe and stylish transportation for prom night. Make the evening unforgettable with luxury service.",
    image: promImg,
  },
  {
    icon: Car,
    title: "NYC Nights Out",
    description: "Enjoy the city without worrying about driving or parking. Travel in comfort and style.",
    image: nightImg,
  },
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative rounded-2xl border-4 border-black overflow-hidden group hover:border-primary transition-all duration-500">
                
                {/* Background image */}
                <div
                  className="w-full h-80 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  {/* Always-visible header overlay */}
                  <div className="absolute top-0 left-0 w-full bg-black/70 p-4">
                    <h3 className="text-white font-bold text-xl drop-shadow-xl transition-colors duration-500 group-hover:text-yellow-400">
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover overlay with description */}
                  <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-white font-light leading-relaxed text-center drop-shadow-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      <div className="mt-20 border-2 border-yellow-400 rounded-2xl p-10 bg-card">

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl font-serif text-yellow-400 mb-6 text-center"
  >
    Complimentary Wait Time & Cancellation Policy
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="text-white text-lg leading-relaxed text-left"
  >
    At Aircorporate Limo Service, we understand that travel plans can change. To ensure a smooth and stress-free experience, we offer the following complimentary wait times:
  </motion.p>

  <motion.ul
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="mt-6 text-white text-lg list-disc list-inside space-y-2 text-left"
  >
    <li>60 minutes complimentary wait time for airport pickups beginning at the scheduled flight arrival time.</li>
    <li>15 minutes complimentary wait time for all other pickups.</li>
  </motion.ul>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="mt-6 text-white text-lg leading-relaxed text-left"
  >
    After the complimentary period, additional wait time may be billed. Please contact us in advance for cancellations. Late cancellations may be subject to a cancellation fee.
  </motion.p>

</div>
      </div>
    </section>
  );
}
