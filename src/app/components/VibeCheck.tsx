import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Zap, BookOpen, Users, CalendarDays, Moon, Coffee, Music, Heart, X } from "lucide-react";

interface VibeOption {
  id: string;
  label: string;
  icon: typeof Zap;
}

const step1Options: VibeOption[] = [
  { id: "anxious", label: "ANXIOUS", icon: Zap },
  { id: "study", label: "STUDY FOCUS", icon: BookOpen },
  { id: "social", label: "SOCIAL HARMONY", icon: Users },
  { id: "sunday", label: "SUNDAY SCARIES", icon: CalendarDays },
];

const step2Options: VibeOption[] = [
  { id: "sleep", label: "SLEEP DEPRIVED", icon: Moon },
  { id: "energized", label: "ENERGIZED", icon: Coffee },
  { id: "calm", label: "CALM", icon: Heart },
  { id: "restless", label: "RESTLESS", icon: Music },
];

const step3Options = [
  { id: "morning", label: "Morning (6AM-12PM)" },
  { id: "afternoon", label: "Afternoon (12PM-6PM)" },
  { id: "evening", label: "Evening (6PM-10PM)" },
  { id: "night", label: "Night (10PM-6AM)" },
];

const step4Options = [
  { id: "immediate", label: "Right now" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "general", label: "Generally feeling this way" },
];

export default function VibeCheck() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<{ vibes: string[]; intensity: number }>({
    vibes: [],
    intensity: 50,
  });
  const [step2Data, setStep2Data] = useState<string[]>([]);
  const [step3Data, setStep3Data] = useState<string>("");
  const [step4Data, setStep4Data] = useState<string>("");

  const toggleStep1Vibe = (vibeId: string) => {
    setStep1Data((prev) => ({
      ...prev,
      vibes: prev.vibes.includes(vibeId)
        ? prev.vibes.filter((id) => id !== vibeId)
        : [...prev.vibes, vibeId],
    }));
  };

  const toggleStep2Vibe = (vibeId: string) => {
    setStep2Data((prev) =>
      prev.includes(vibeId) ? prev.filter((id) => id !== vibeId) : [...prev, vibeId]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    const vibeCheckData = {
      step1: step1Data,
      step2: step2Data,
      step3: step3Data,
      step4: step4Data,
      timestamp: Date.now(),
    };
    localStorage.setItem("vibeCheckData", JSON.stringify(vibeCheckData));
    navigate("/dashboard");
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit? Your progress will be lost.");
    if (confirmExit) {
      navigate("/onboarding");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return step1Data.vibes.length > 0;
      case 2:
        return step2Data.length > 0;
      case 3:
        return step3Data !== "";
      case 4:
        return step4Data !== "";
      default:
        return false;
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6F5] via-[#E8ECE8] to-[#C9D9C9] relative overflow-hidden">
      {/* Ambient light animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, #A8B9A8 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, #D97757 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, #A8B9A8 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Exit button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleExit}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[#6B7B6B] hover:text-[#2F4F3F] hover:bg-white/80 transition-all"
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#6B7B6B] text-sm">Step {currentStep} of 4</span>
              <span className="text-[#6B7B6B] text-sm">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#A8B9A8] to-[#2F4F3F]"
              />
            </div>
          </motion.div>

          {/* Main container */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Primary Feelings */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    className="text-3xl md:text-4xl text-[#2F4F3F] text-center mb-8"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    How are you <em>actually</em> feeling?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {step1Options.map((vibe, index) => {
                      const Icon = vibe.icon;
                      const isSelected = step1Data.vibes.includes(vibe.id);

                      return (
                        <motion.button
                          key={vibe.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleStep1Vibe(vibe.id)}
                          className={`
                            relative px-6 py-5 rounded-full font-medium text-sm tracking-wide
                            transition-all duration-300 border-2 overflow-hidden
                            ${
                              isSelected
                                ? "bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white border-[#D97757] shadow-lg"
                                : "bg-white/40 text-[#6B7B6B] border-white/60 hover:border-[#A8B9A8]"
                            }
                          `}
                        >
                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 bg-white"
                              animate={{ opacity: [0, 0.2, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                          <div className="relative z-10 flex items-center justify-center gap-3">
                            <Icon
                              className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#A8B9A8]"}`}
                            />
                            <span>{vibe.label}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {step1Data.vibes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4 }}
                      className="mb-6"
                    >
                      <label className="block text-[#2F4F3F] text-center mb-4">
                        How intense?
                      </label>
                      <div className="space-y-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={step1Data.intensity}
                          onChange={(e) =>
                            setStep1Data((prev) => ({
                              ...prev,
                              intensity: Number(e.target.value),
                            }))
                          }
                          className="w-full h-2 bg-white/60 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-[#6B7B6B]">
                          <span>A little</span>
                          <span className="font-medium text-[#2F4F3F]">
                            {step1Data.intensity}%
                          </span>
                          <span>Very much</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Energy Level */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    className="text-3xl md:text-4xl text-[#2F4F3F] text-center mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    What's your energy like?
                  </h2>
                  <p className="text-center text-[#6B7B6B] mb-8">
                    Help us understand your physical state
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {step2Options.map((vibe, index) => {
                      const Icon = vibe.icon;
                      const isSelected = step2Data.includes(vibe.id);

                      return (
                        <motion.button
                          key={vibe.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleStep2Vibe(vibe.id)}
                          className={`
                            relative px-6 py-5 rounded-full font-medium text-sm tracking-wide
                            transition-all duration-300 border-2 overflow-hidden
                            ${
                              isSelected
                                ? "bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white border-[#D97757] shadow-lg"
                                : "bg-white/40 text-[#6B7B6B] border-white/60 hover:border-[#A8B9A8]"
                            }
                          `}
                        >
                          <div className="relative z-10 flex items-center justify-center gap-3">
                            <Icon
                              className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#A8B9A8]"}`}
                            />
                            <span>{vibe.label}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Time of Day */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    className="text-3xl md:text-4xl text-[#2F4F3F] text-center mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    When do you feel this most?
                  </h2>
                  <p className="text-center text-[#6B7B6B] mb-8">
                    Patterns help us personalize your experience
                  </p>

                  <div className="space-y-3">
                    {step3Options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep3Data(option.id)}
                        className={`
                          w-full px-6 py-5 rounded-2xl font-medium text-base
                          transition-all duration-300 border-2 text-left
                          ${
                            step3Data === option.id
                              ? "bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white border-[#D97757] shadow-lg"
                              : "bg-white/40 text-[#6B7B6B] border-white/60 hover:border-[#A8B9A8]"
                          }
                        `}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Duration */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    className="text-3xl md:text-4xl text-[#2F4F3F] text-center mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    How long have you felt this way?
                  </h2>
                  <p className="text-center text-[#6B7B6B] mb-8">
                    This helps us provide the right support
                  </p>

                  <div className="space-y-3">
                    {step4Options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep4Data(option.id)}
                        className={`
                          w-full px-6 py-5 rounded-2xl font-medium text-base
                          transition-all duration-300 border-2 text-left
                          ${
                            step4Data === option.id
                              ? "bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white border-[#D97757] shadow-lg"
                              : "bg-white/40 text-[#6B7B6B] border-white/60 hover:border-[#A8B9A8]"
                          }
                        `}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="flex-1 py-4 rounded-2xl font-medium bg-white/60 text-[#2F4F3F] border-2 border-white/60 hover:border-[#A8B9A8] transition-all"
                >
                  BACK
                </motion.button>
              )}
              <motion.button
                whileHover={canProceed() ? { scale: 1.02 } : {}}
                whileTap={canProceed() ? { scale: 0.98 } : {}}
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  ${currentStep === 1 ? "w-full" : "flex-1"} py-4 rounded-2xl font-medium relative overflow-hidden
                  transition-all duration-300
                  ${
                    canProceed()
                      ? "bg-gradient-to-r from-[#2F4F3F] to-[#3A5F4F] text-white shadow-lg cursor-pointer"
                      : "bg-white/40 text-[#A8B9A8] cursor-not-allowed"
                  }
                `}
              >
                {canProceed() && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10">
                  {currentStep === 4 ? "COMPLETE" : "NEXT"}
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Helper text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-[#6B7B6B] text-sm mt-6"
          >
            {currentStep === 1 && "Select all that apply"}
            {currentStep === 2 && "Choose what resonates most"}
            {currentStep === 3 && "Help us understand your patterns"}
            {currentStep === 4 && "Almost there"}
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D97757 0%, #C66B4F 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(217, 119, 87, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D97757 0%, #C66B4F 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(217, 119, 87, 0.3);
        }
      `}</style>
    </div>
  );
}
