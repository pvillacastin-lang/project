import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type BreathingPhase = "inhale" | "hold" | "exhale" | "pause";

interface TechniqueConfig {
  name: string;
  phases: { phase: BreathingPhase; duration: number; label: string }[];
  cycles: number;
}

const techniques: Record<string, TechniqueConfig> = {
  box: {
    name: "Box Breathing",
    cycles: 4,
    phases: [
      { phase: "inhale", duration: 4000, label: "INHALING..." },
      { phase: "hold", duration: 4000, label: "HOLDING..." },
      { phase: "exhale", duration: 4000, label: "EXHALING..." },
      { phase: "pause", duration: 4000, label: "PAUSING..." },
    ],
  },
  focus: {
    name: "Focus Breathing",
    cycles: 5,
    phases: [
      { phase: "inhale", duration: 5000, label: "BREATHE IN..." },
      { phase: "hold", duration: 2000, label: "HOLD..." },
      { phase: "exhale", duration: 6000, label: "BREATHE OUT..." },
    ],
  },
  grounding: {
    name: "Grounding",
    cycles: 4,
    phases: [
      { phase: "inhale", duration: 4000, label: "INHALING..." },
      { phase: "exhale", duration: 6000, label: "EXHALING..." },
    ],
  },
  sleep: {
    name: "Sleep Breathing",
    cycles: 6,
    phases: [
      { phase: "inhale", duration: 4000, label: "BREATHE IN..." },
      { phase: "hold", duration: 7000, label: "HOLD..." },
      { phase: "exhale", duration: 8000, label: "RELEASE..." },
    ],
  },
};

export default function BreathingSession() {
  const navigate = useNavigate();
  const { technique: techniqueParam } = useParams<{ technique: string }>();
  const technique = techniques[techniqueParam || "box"] || techniques.box;

  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentPhase = technique.phases[currentPhaseIndex];

  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      // Move to next phase
      if (currentPhaseIndex < technique.phases.length - 1) {
        setCurrentPhaseIndex(currentPhaseIndex + 1);
      } else {
        // Move to next cycle
        if (currentCycle < technique.cycles) {
          setCurrentCycle(currentCycle + 1);
          setCurrentPhaseIndex(0);
        } else {
          setIsComplete(true);
        }
      }
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [currentPhaseIndex, currentCycle, currentPhase, technique, isComplete]);

  const getOrbColor = (phase: BreathingPhase) => {
    switch (phase) {
      case "inhale":
        return "#A8B9A8";
      case "exhale":
        return "#D97757";
      case "hold":
        return "#2F4F3F";
      case "pause":
        return "#C9D9C9";
      default:
        return "#A8B9A8";
    }
  };

  const getOrbScale = (phase: BreathingPhase) => {
    switch (phase) {
      case "inhale":
        return 1.5;
      case "exhale":
        return 0.8;
      case "hold":
        return 1.5;
      case "pause":
        return 0.8;
      default:
        return 1;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1F3B2F] via-[#2F4F3F] to-[#3A5F4F] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto bg-[#A8B9A8] rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">✓</span>
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Session Complete
          </h2>
          <p className="text-white/70 text-lg">
            You've completed {technique.cycles} cycles of {technique.name}
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-4 bg-[#D97757] text-white rounded-full text-lg font-medium"
          >
            Return to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F3B2F] via-[#2F4F3F] to-[#3A5F4F] relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(168, 185, 168, 0.3) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 60%, rgba(217, 119, 87, 0.3) 0%, transparent 60%)",
            "radial-gradient(circle at 30% 40%, rgba(168, 185, 168, 0.3) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Exit button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Cycle counter */}
      <div className="absolute top-6 right-20 z-20 text-white/60 text-sm">
        Cycle {currentCycle} of {technique.cycles}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Central Orb */}
        <motion.div
          key={currentPhase.phase}
          className="relative mb-12"
          initial={{ scale: 1 }}
          animate={{ scale: getOrbScale(currentPhase.phase) }}
          transition={{
            duration: currentPhase.duration / 1000,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-64 h-64 rounded-full relative"
            style={{
              background: `radial-gradient(circle, ${getOrbColor(currentPhase.phase)}66, ${getOrbColor(currentPhase.phase)}33)`,
              boxShadow: `0 0 80px ${getOrbColor(currentPhase.phase)}80`,
            }}
            animate={{
              boxShadow: [
                `0 0 60px ${getOrbColor(currentPhase.phase)}60`,
                `0 0 100px ${getOrbColor(currentPhase.phase)}90`,
                `0 0 60px ${getOrbColor(currentPhase.phase)}60`,
              ],
            }}
            transition={{
              duration: currentPhase.duration / 1000,
              repeat: 0,
              ease: "easeInOut",
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-8 rounded-full"
              style={{
                background: `radial-gradient(circle, ${getOrbColor(currentPhase.phase)}99, transparent)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: currentPhase.duration / 1000,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Instruction text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-white text-3xl font-light tracking-widest">
              {currentPhase.label}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Subtle technique name at bottom */}
        <div className="absolute bottom-12 text-white/40 text-sm">
          {technique.name}
        </div>
      </div>
    </div>
  );
}
