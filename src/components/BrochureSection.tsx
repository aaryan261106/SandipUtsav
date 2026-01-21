import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Eye, Share2 } from "lucide-react";
import competitionPoster from "@/assets/competition-poster.jpg";
import sandipUniversityLogo from "@/assets/sandip-university-logo.png";

const PDF_PATH = "/SandipOtsav.pdf";

const BrochureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleShare = () => {
    const url = window.location.origin + PDF_PATH;

    if (navigator.share) {
      navigator.share({
        title: "SANDIPOTSAV 2K26 Sponsorship Proposal",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("PDF link copied!");
    }
  };

  return (
    <section
      id="brochure"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={sandipUniversityLogo}
              alt="Sandip University"
              className="h-16 md:h-20 w-auto mb-6 brightness-0 dark:brightness-100 invert dark:invert-0"
            />

            <h2 className="font-display text-5xl md:text-7xl mb-6">
              Event <span className="text-primary">Brochure</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Download the official Sandipotsav 2K26 brochure for complete
              schedules, competitions, venues, and sponsorship details.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Download */}
              <motion.a
                href={PDF_PATH}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold festival-shadow">
                  <Download size={20} />
                  Download PDF
                </button>
              </motion.a>

              {/*Online View */}
              <motion.a
                href={PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold">
                  <Eye size={20} />
                  View Online
                </button>
              </motion.a>

              {/* Share */}
              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={20} />
                Share
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
<motion.div
  className="relative"
  initial={{ opacity: 0, x: 50 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <div className="relative">
    {/* Main Image */}
    <motion.div
      className="relative z-10 rounded-2xl overflow-hidden retro-border"
      initial={{ rotate: 3 }}
      animate={{ rotate: 3 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <img
        src={competitionPoster}
        alt="Sandipotsav Brochure Preview"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-sm">
          2026 Edition
        </span>
      </div>
    </motion.div>

    {/* Glow Background */}
    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl -z-10 blur-xl" />
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrochureSection;
