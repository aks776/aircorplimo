import { motion } from "framer-motion";

const FLEET = [
  {
    name: "Luxury Sedan",
    capacity: "3 Passengers",
    description: "Perfect for executive travel and discreet airport transfers.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Premium SUV",
    capacity: "6 Passengers",
    description: "Spacious comfort with ample luggage room for groups and families.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Executive Van",
    capacity: "12 Passengers",
    description: "The ultimate group transport offering stand-up headroom and premium seating.",
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800&auto=format&fit=crop"
  }
];

export function Fleet() {
  return (
    <section id="fleet" className="py-24 lg:py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h4 className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              The Collection
            </h4>
            <h2 className="font-serif text-4xl lg:text-5xl text-white">
              Impeccable Vehicles
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-muted-foreground font-light max-w-sm">
              Each vehicle in our fleet is meticulously maintained and features premium leather interiors, climate control, and complimentary amenities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FLEET.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10 duration-500" />
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 border border-white/5 border-t-0 bg-[#141414]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-xl text-white">{vehicle.name}</h3>
                  <span className="text-primary text-xs tracking-widest uppercase">{vehicle.capacity}</span>
                </div>
                <p className="text-sm text-muted-foreground font-light">
                  {vehicle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
