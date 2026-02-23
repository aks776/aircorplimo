import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, Car, User, Mail, Phone, Loader2 } from "lucide-react";
import { useSubmitBooking } from "@/hooks/use-booking";

const bookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  pickup: z.string().min(1, "Pickup location is required"),
  dropoff: z.string().min(1, "Dropoff location is required"),
  dateTime: z.string().min(1, "Date and time is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingSection() {
  const { mutateAsync: submitBooking, isPending } = useSubmitBooking();
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { vehicleType: "" }
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      await submitBooking(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Form */}
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
                  <h3 className="font-serif text-2xl text-white mb-2">Request Submitted</h3>
                  <p className="text-white/70 font-light">
                    Your booking request has been received successfully. Our team will contact you shortly to confirm details.
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
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-0 top-3 w-5 h-5 text-white/30" />
                      <input 
                        {...register("firstName")}
                        placeholder="First Name" 
                        className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.firstName && <span className="text-red-500 text-xs mt-1 absolute -bottom-4 left-0">{errors.firstName.message}</span>}
                    </div>
                    <div className="relative">
                      <input 
                        {...register("lastName")}
                        placeholder="Last Name" 
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.lastName && <span className="text-red-500 text-xs mt-1 absolute -bottom-4 left-0">{errors.lastName.message}</span>}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div className="relative">
                      <Mail className="absolute left-0 top-3 w-5 h-5 text-white/30" />
                      <input 
                        {...register("email")}
                        type="email"
                        placeholder="Email Address" 
                        className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-0 top-3 w-5 h-5 text-white/30" />
                      <input 
                        {...register("phone")}
                        placeholder="Phone Number" 
                        className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="pt-2 relative">
                    <MapPin className="absolute left-0 top-3 w-5 h-5 text-white/30" />
                    <input 
                      {...register("pickup")}
                      placeholder="Pickup Location (e.g. Newark Airport)" 
                      className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-0 top-3 w-5 h-5 text-primary/70" />
                    <input 
                      {...register("dropoff")}
                      placeholder="Dropoff Location (e.g. Boonton, NJ)" 
                      className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Date & Vehicle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="relative">
                      <Calendar className="absolute left-0 top-3 w-5 h-5 text-white/30 z-10 pointer-events-none" />
                      <input 
                        {...register("dateTime")}
                        type="datetime-local"
                        className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Car className="absolute left-0 top-3 w-5 h-5 text-white/30 z-10 pointer-events-none" />
                      <select 
                        {...register("vehicleType")}
                        className="w-full bg-transparent border-b border-white/20 pl-8 pb-3 text-white appearance-none focus:outline-none focus:border-primary transition-colors [&>option]:bg-[#141414]"
                      >
                        <option value="" disabled hidden>Select Vehicle</option>
                        <option value="Luxury Sedan">Luxury Sedan (3 Pax)</option>
                        <option value="Premium SUV">Premium SUV (6 Pax)</option>
                        <option value="Executive Van">Executive Van (12 Pax)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-6 flex items-center justify-center bg-primary text-black py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-70"
                  >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                  </button>
                  <p className="text-center text-white/40 text-xs font-light mt-4">
                    No payment required to submit a request.
                  </p>
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
            className="lg:col-span-7 h-[400px] lg:h-auto min-h-[500px] border border-white/10 relative overflow-hidden grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
          >
            {/* Visual map placeholder pointing to Boonton, NJ without needing an API key */}
            <iframe
              title="Service Area Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://maps.google.com/maps?q=Boonton,%20NJ&t=m&z=12&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              className="absolute inset-0"
            />
            {/* Dark overlay to match luxury theme */}
            <div className="absolute inset-0 bg-[#141414]/30 pointer-events-none mix-blend-multiply" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
