import { motion } from "framer-motion";

// ✅ Import images from src/images
import mkt from '../../images/mkttwo.webp';
import mktAvitor from '../../images/mktavitor.jpeg';
import esclade1 from '../../images/esclade1.jpeg';
import surban from '../../images/surban.jpeg';
import ford from '../../images/ford.jpeg'; // Van image

export function Fleet() {
  const SEDANS = [
    { name: "Lincoln MKT", capacity: "3 Passengers", description: "Executive luxury sedan for airport and city transfers.", image: mkt },
    { name: "Lincoln Aviator", capacity: "3 Passengers", description: "Smooth ride with premium interiors.", image: mktAvitor },
  ];

  const SUVS = [
    { name: "Cadillac Escalade", capacity: "6 Passengers", description: "Spacious SUV with ample luggage room for families.", image: esclade1 },
    { name: "Chevy Suburban", capacity: "6 Passengers", description: "Perfect for group travel with comfort and style.", image: surban },
  ];

  const VANS = [
    { name: "Ford Transit Van", capacity: "12 Passengers", description: "Premium group transport.", image: ford }
  ];

  const VehicleCard = ({ vehicle }: { vehicle: { name: string; capacity: string; description: string; image: string } }) => (
    <motion.div
      className="bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div style={{ width: '100%', height: '16rem', overflow: 'hidden' }}>
        <img src={vehicle.image} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="p-6">
        <h3 className="text-white font-semibold text-xl mb-2">{vehicle.name}</h3>
        <p className="text-gray-400 mb-2">{vehicle.capacity}</p>
        <p className="text-gray-300 text-sm">{vehicle.description}</p>
      </div>
    </motion.div>
  );

  return (
  <section id="fleet" className="py-16 lg:py-28 bg-[#141414]">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6 text-center lg:text-left">
        <div className="max-w-xl mx-auto lg:mx-0">
          <h4 className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            The Collection
          </h4>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Impeccable Vehicles
          </h2>
        </div>

        <p className="text-gray-400 font-light max-w-md mx-auto lg:mx-0">
          Each vehicle in our fleet is meticulously maintained and features
          premium leather interiors, climate control, and complimentary amenities.
        </p>
      </div>

      {/* Sedans */}
      <h2 className="font-serif text-2xl sm:text-3xl text-white mb-8 text-center lg:text-left">
        Sedans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {SEDANS.map(vehicle => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} />
        ))}
      </div>

      {/* SUVs */}
      <h2 className="font-serif text-2xl sm:text-3xl text-white mb-8 text-center lg:text-left">
        SUVs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {SUVS.map(vehicle => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} />
        ))}
      </div>

      {/* Van */}
      <h2 className="font-serif text-2xl sm:text-3xl text-white mb-8 text-center lg:text-left">
        Van
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {VANS.map(vehicle => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} />
        ))}
      </div>

    </div>
  </section>
);
}