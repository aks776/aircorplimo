/// <reference types="@types/google.maps" />
import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, Car, User, Mail, Phone, Loader2 } from "lucide-react";
import { useSubmitBooking } from "@/hooks/use-booking";

declare global {
  interface Window {
    google: any;
  }
}

const bookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  pickup: z.string().min(1, "Pickup location is required"),
  dropoff: z.string().min(1, "Dropoff location is required"),
  stops: z.array(z.string()),
  dateTime: z.string().min(1, "Date and time is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingSection() {
  const { mutateAsync: submitBooking, isPending } = useSubmitBooking();
  const [isSuccess, setIsSuccess] = useState(false);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<google.maps.Map | null>(null);
  const pickupAuto = useRef<google.maps.places.Autocomplete | null>(null);
  const dropoffAuto = useRef<google.maps.places.Autocomplete | null>(null);
  const stopsAuto = useRef<google.maps.places.Autocomplete[]>([]);
  const stopMarkers = useRef<google.maps.Marker[]>([]);

  const openDateTimePicker = () => {
    const input = document.getElementById("dateTime") as HTMLInputElement | null;
    if (!input) return;

    // Small delay to ensure better mobile compatibility
    setTimeout(() => {
      input.focus();
      try {
        if (typeof input.showPicker === "function") {
          input.showPicker();
        }
      } catch {
        // Fallback: some browsers/contexts don't allow showPicker
        input.click();
      }
    }, 10);
  };

  const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pickup: "",
      dropoff: "",
      stops: [],
      dateTime: "",
      vehicleType: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "stops",
  });

  const onSubmit = async (data: BookingFormValues) => {
  try {

    // format datetime
    if (data.dateTime) {
      const date = new Date(data.dateTime);

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;

      data.dateTime = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
    }

    await submitBooking(data);

    setIsSuccess(true);

    // clear markers
    stopMarkers.current.forEach(marker => marker.setMap(null));
    stopMarkers.current = [];

    // destroy autocomplete instances
    pickupAuto.current = null;
    dropoffAuto.current = null;
    stopsAuto.current = [];

    // reset form
    reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pickup: "",
      dropoff: "",
      stops: [],
      dateTime: "",
      vehicleType: "",
    });

    // reinitialize autocomplete after DOM updates
    
    setTimeout(() => setIsSuccess(false), 5000);
    setTimeout(() => {
      initMap();
    }, 300);


  } catch (error) {
    console.error("Booking error:", error);
  }
};
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcbq2K6HTvIEd3ueGfL5K1CFgz6uEeiBA&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.google?.maps?.places) return;

    mapObj.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.897, lng: -74.258 },
      zoom: 12,
    });

    const pickupInput = document.getElementById("pickup") as HTMLInputElement;
    const dropoffInput = document.getElementById("dropoff") as HTMLInputElement;

    if (pickupInput) pickupAuto.current = new window.google.maps.places.Autocomplete(pickupInput);
    if (dropoffInput) dropoffAuto.current = new window.google.maps.places.Autocomplete(dropoffInput);

    pickupAuto.current?.addListener("place_changed", updateStopMarkers);
    dropoffAuto.current?.addListener("place_changed", updateStopMarkers);
  };

  const initStopAutocomplete = (index: number) => {
    const stopInput = document.getElementById(`stop-${index}`) as HTMLInputElement;
    if (!stopInput) return;

    const auto = new window.google.maps.places.Autocomplete(stopInput);
    auto.addListener("place_changed", updateStopMarkers);
    stopsAuto.current[index] = auto;
  };

  const updateStopMarkers = () => {
    if (!mapObj.current) return;

    // Clear old markers
    stopMarkers.current.forEach(marker => marker.setMap(null));
    stopMarkers.current = [];

    // Pickup marker
    const pickupPlace = pickupAuto.current?.getPlace()?.geometry?.location;
    if (pickupPlace) {
      new google.maps.Marker({
        position: pickupPlace,
        map: mapObj.current,
        title: "Pickup",
      });
    }

    // Dropoff marker
    const dropoffPlace = dropoffAuto.current?.getPlace()?.geometry?.location;
    if (dropoffPlace) {
      new google.maps.Marker({
        position: dropoffPlace,
        map: mapObj.current,
        title: "Dropoff",
      });
    }

    // Stop markers in green
    fields.forEach((_, idx) => {
      const stopPlace = stopsAuto.current[idx]?.getPlace()?.geometry?.location;
      if (stopPlace) {
        const marker = new google.maps.Marker({
          position: stopPlace,
          map: mapObj.current!,
          title: `Stop ${idx + 1}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "green",
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });
        stopMarkers.current.push(marker);
      }
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("stops") || name === "pickup" || name === "dropoff") {
        updateStopMarkers();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, fields]);
  const addStop = () => {
  append(""); // add new stop field
  setTimeout(() => initStopAutocomplete(fields.length), 0); // initialize autocomplete immediately
};

  return (
    <section id="booking" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h4 className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Secure Your Ride
            </h4>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-8">
              Make a Reservation
            </h2>

            <AnimatePresence mode="wait">
              {isSuccess ? (
               <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  className="bg-primary/10 border border-primary/30 p-8 flex flex-col items-center text-center rounded-sm"
>
  <CheckCircle2 className="w-16 h-16 text-primary mb-4" />

  <h3 className="font-serif text-2xl text-white mb-2">
    Thank You!
  </h3>

  <p className="text-white/70 font-light max-w-md">
    Thank you for submitting your booking request.  
    Our team will review your details and reach out to you shortly.
  </p>
</motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-6"
                >
                  {/* Personal Info */}
<div className="space-y-4">
  <div className="flex flex-row gap-4">
    <div className="flex min-w-0 basis-0 items-center gap-2 border-b border-white/20 px-3 py-2 flex-1">
      <User className="w-5 h-5 text-white/30 flex-shrink-0" />
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
    <div className="flex min-w-0 basis-0 items-center gap-2 border-b border-white/20 px-3 py-2 flex-1">
      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
  </div>
  {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
  {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
</div>

{/* Contact Info */}
<div className="space-y-4">
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex items-center gap-2 border-b border-white/20 px-2 py-2 flex-1">
      <Mail className="w-5 h-5 text-white/30 flex-shrink-0" />
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
    <div className="flex items-center gap-2 border-b border-white/20 px-2 py-2 flex-1">
      <Phone className="w-5 h-5 text-white/30 flex-shrink-0" />
      <input
        {...register("phone")}
        placeholder="Phone"
        className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
  </div>
</div>
<div className="flex flex-col md:flex-row gap-4 mt-2">
  <label
    htmlFor="dateTime"
    onClick={openDateTimePicker}
    className="flex items-center gap-2 border-b border-white/20 px-2 py-2 flex-1 cursor-pointer relative"
  >
  <Calendar className="w-5 h-5 text-white/30 flex-shrink-0 pointer-events-none" />
  
  {!watch("dateTime") && (
    <span className="absolute left-12 text-white/30 pointer-events-none md:hidden">
      Date & Time
    </span>
  )}

  <input
      id="dateTime"
    {...register("dateTime")}
    type="datetime-local" // always datetime-local for mobile compatibility
    className="flex-1 appearance-none bg-transparent text-white placeholder:text-white/30 focus:outline-none"
  />
  </label>
  </div>

{/* Pickup */}
<div className="flex items-center gap-2 border-b border-white/20 px-2 py-2 mt-2">
  <MapPin className="w-5 h-5 text-white/30 flex-shrink-0" />
  <input
    id="pickup"
    {...register("pickup")}
    placeholder="Pickup"
    className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
  />
</div>

{/* Stops */}
<div className="space-y-3 mt-2">
  {fields.map((field, index) => (
    <div key={field.id} className="flex items-center gap-2 border-b border-white/20 px-2 py-2">
      <MapPin className="w-5 h-5 text-white/30 flex-shrink-0" />
      <input
        id={`stop-${index}`}
        {...register(`stops.${index}` as const)}
        placeholder={`Stop ${index + 1}`}
        className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
      <button type="button" onClick={() => remove(index)} className="text-red-500 text-xs flex-shrink-0">
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => { append(""); setTimeout(() => initStopAutocomplete(fields.length), 100); }}
    className="text-primary text-sm uppercase tracking-wide"
  >
    + Add Stop
  </button>
</div>

{/* Dropoff */}
<div className="flex items-center gap-2 border-b border-white/20 px-2 py-2 mt-2">
  <MapPin className="w-5 h-5 text-white/30 flex-shrink-0" />
  <input
    id="dropoff"
    {...register("dropoff")}
    placeholder="Dropoff"
    className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
  />
</div>

{/* Date & Vehicle */}
<div className="flex flex-col md:flex-row gap-4 mt-2">

  <div className="flex items-center gap-2 border-b border-white/20 px-2 py-2 flex-1">
  <Car className="w-5 h-5 text-white/30 flex-shrink-0 pointer-events-none" />
  <select
    {...register("vehicleType")}
    className="flex-1 bg-transparent text-white border-none focus:outline-none appearance-none"
  >
    <option value="" disabled hidden>Select Vehicle</option>
    <option value="SEDAN 3 PAX" className="bg-black text-white">SEDAN (3 pax)</option>
    <option value="SUV 6 PAX" className="bg-black text-white">SUV (6 pax)</option>
    <option value="Ford Transit Van" className="bg-black text-white">Transit Van (12 pax)</option>
  </select>
</div>
</div>

                  <button type="submit" disabled={isPending} className="w-full mt-6 flex items-center justify-center bg-primary text-black py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-70">
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 h-[400px] lg:h-auto min-h-[500px] border border-white/10 relative overflow-hidden"
          >
            <div ref={mapRef} className="absolute inset-0 w-full h-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}