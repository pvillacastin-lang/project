import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("calmUsername");
    if (savedUsername) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6F5] via-[#E8ECE8] to-[#D9E5D9] flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-full bg-[#A8B9A8]"
      />
    </div>
  );
}
