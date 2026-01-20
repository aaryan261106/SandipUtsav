import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, User, Mail, Phone, School, Trophy, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  college: z.string().min(2, "College name is required").max(200),
  event: z.string().min(1, "Please select an event"),
  teamSize: z.string().min(1, "Please select team size"),
  message: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const events = [
  "Battle of Bands",
  "Solo Singing",
  "Dance Competition (Solo)",
  "Dance Competition (Group)",
  "Stand-up Comedy",
  "Photography Contest",
  "Art Exhibition",
  "Gaming Tournament",
  "Fashion Show",
  "Drama/Theatre",
  "Debate Competition",
  "Quiz Competition",
  "Rangoli Making",
  "Face Painting",
];

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    toast.success("Registration successful! We'll contact you soon.");
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="register" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-accent rounded-full"
          animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-6 h-6 bg-primary rounded-full"
          animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-3 h-3 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-accent" size={24} />
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Limited Spots Available
            </span>
            <Sparkles className="text-accent" size={24} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            Register <span className="text-primary">Now</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Be part of the biggest cultural festival! Fill out the form below to secure your spot.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-background rounded-3xl p-8 md:p-10 card-shadow border border-border"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* College */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <School size={18} />
                  College/University
                </label>
                <input
                  {...register("college")}
                  placeholder="Your institution"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
                {errors.college && (
                  <p className="text-destructive text-sm">{errors.college.message}</p>
                )}
              </div>

              {/* Event */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Trophy size={18} />
                  Select Event
                </label>
                <select
                  {...register("event")}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground appearance-none cursor-pointer"
                >
                  <option value="">Choose an event</option>
                  {events.map((event) => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
                {errors.event && (
                  <p className="text-destructive text-sm">{errors.event.message}</p>
                )}
              </div>

              {/* Team Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  Team Size
                </label>
                <select
                  {...register("teamSize")}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground appearance-none cursor-pointer"
                >
                  <option value="">Select team size</option>
                  <option value="1">Solo (1 person)</option>
                  <option value="2">Duo (2 people)</option>
                  <option value="3-4">Small Team (3-4 people)</option>
                  <option value="5+">Large Team (5+ people)</option>
                </select>
                {errors.teamSize && (
                  <p className="text-destructive text-sm">{errors.teamSize.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 mt-6">
              <label className="text-foreground font-medium">
                Additional Message (Optional)
              </label>
              <textarea
                {...register("message")}
                placeholder="Tell us something about yourself or your team..."
                rows={4}
                className="w-full px-4 py-3 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="w-full mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg festival-shadow hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitted ? (
                <>
                  <Check size={24} />
                  Registration Successful!
                </>
              ) : isSubmitting ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={24} />
                  Submit Registration
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
