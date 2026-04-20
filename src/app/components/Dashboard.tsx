import { useNavigate } from "react-router";
import { Brain, BookOpen, Users, Moon, Sparkles, LogOut, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Alex");
  const [vibeCheckData, setVibeCheckData] = useState<{
    step1?: { vibes: string[]; intensity: number };
    step2?: string[];
    step3?: string;
    step4?: string;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("calmUsername");
    if (savedUsername) {
      setUserName(savedUsername);
    }

    // Load vibe check data
    const savedVibeCheck = localStorage.getItem("vibeCheckData");
    if (savedVibeCheck) {
      setVibeCheckData(JSON.parse(savedVibeCheck));
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("calmUsername");
      navigate("/onboarding");
    }
  };

  const getVibeLabel = (vibeId: string) => {
    const labels: { [key: string]: string } = {
      anxious: "Anxious",
      study: "Study Focus",
      social: "Social Harmony",
      sunday: "Sunday Scaries",
      sleep: "Sleep Deprived",
      energized: "Energized",
      calm: "Calm",
      restless: "Restless",
    };
    return labels[vibeId] || vibeId;
  };

  const getVibeMessage = () => {
    if (!vibeCheckData || !vibeCheckData.step1) {
      return {
        state: "Not checked yet",
        message: "Take your first vibe check to get personalized recommendations.",
        prompt: "Tap to check in →",
      };
    }

    const { vibes, intensity } = vibeCheckData.step1;
    const vibeLabels = vibes.map(getVibeLabel).join(" + ");
    
    let intensityText = "";
    if (intensity < 30) {
      intensityText = "lightly";
    } else if (intensity < 70) {
      intensityText = "moderately";
    } else {
      intensityText = "intensely";
    }

    let suggestion = "";
    if (vibes.includes("anxious") && intensity > 60) {
      suggestion = "A 2-minute breathing reset could help ground you.";
    } else if (vibes.includes("study") && intensity > 50) {
      suggestion = "Try a focus session with built-in breaks.";
    } else if (vibes.includes("social")) {
      suggestion = "Consider a grounding exercise before your next social moment.";
    } else if (vibes.includes("sunday")) {
      suggestion = "A reflection journal might help ease those weekend worries.";
    } else {
      suggestion = "Your current state looks balanced. Keep it up!";
    }

    return {
      state: `${vibeLabels} (${intensityText})`,
      message: suggestion,
      prompt: "Tap to update →",
    };
  };

  const vibeMessage = getVibeMessage();

  const handleQuickReset = () => {
    navigate("/breathing/box");
  };

  const modules = [
    {
      id: "study",
      title: "Study Mode",
      description: "Focus timers with breathing breaks",
      icon: BookOpen,
      color: "from-[#2F4F3F] to-[#3A5F4F]",
      action: () => navigate("/breathing/focus"),
    },
    {
      id: "social",
      title: "Social Harmony",
      description: "Grounding for social moments",
      icon: Users,
      color: "from-[#A8B9A8] to-[#8FA99F]",
      action: () => navigate("/breathing/grounding"),
    },
    {
      id: "journal",
      title: "Sunday Scaries",
      description: "Guided weekly reflection",
      icon: Sparkles,
      color: "from-[#D97757] to-[#C66B4F]",
      action: () => alert("Journal feature - coming soon!"),
    },
    {
      id: "sleep",
      title: "Sleep Support",
      description: "Night-time wind down",
      icon: Moon,
      color: "from-[#1F3B2F] to-[#2F4F3F]",
      action: () => navigate("/breathing/sleep"),
    },
  ];

  const vibeChips = vibeCheckData?.step1?.vibes || [];
  const intensity = vibeCheckData?.step1?.intensity || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6F5] via-[#E8ECE8] to-[#D9E5D9] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Greeting and Logout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl mb-2 text-[#2F4F3F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Welcome, {userName}.
            </h1>
            <p className="text-[#6B7B6B]">How are you feeling today?</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#A8B9A8]/30 rounded-full text-[#2F4F3F] hover:bg-white/80 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </motion.div>

        {/* Vibe Check Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => navigate("/vibe-check")}
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #A8B9A8 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #D97757 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, #2F4F3F 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #A8B9A8 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-3 h-3 rounded-full bg-[#A8B9A8]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <h2 className="text-2xl text-[#2F4F3F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Vibe Check
              </h2>
            </div>
            
            {vibeChips.length > 0 ? (
              <div className="space-y-4">
                {/* Vibe Chips */}
                <div className="flex flex-wrap gap-2">
                  {vibeChips.map((vibe) => (
                    <div
                      key={vibe}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white text-sm font-medium flex items-center gap-2"
                    >
                      {vibe === "anxious" && <Zap className="w-4 h-4" />}
                      {vibe === "study" && <BookOpen className="w-4 h-4" />}
                      {vibe === "social" && <Users className="w-4 h-4" />}
                      {vibe === "sunday" && <Sparkles className="w-4 h-4" />}
                      <span className="uppercase">{getVibeLabel(vibe)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Intensity Display */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#6B7B6B] text-sm">Intensity</span>
                    <span className="text-[#2F4F3F] font-medium">{intensity}%</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#A8B9A8] to-[#D97757]"
                      style={{ width: `${intensity}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-[#6B7B6B] text-sm">
                  {vibeMessage.message}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg text-[#2F4F3F]">
                  <span className="font-medium">Current state:</span> {vibeMessage.state}
                </p>
                <p className="text-[#6B7B6B]">
                  {vibeMessage.message}
                </p>
              </div>
            )}
            
            <p className="text-[#A8B9A8] text-sm mt-3">
              {vibeMessage.prompt}
            </p>
          </div>
        </motion.div>

        {/* Quick Reset Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleQuickReset}
          className="w-full bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white py-6 rounded-3xl shadow-xl relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 text-xl font-medium flex items-center justify-center gap-3">
            <Brain className="w-6 h-6" />
            Quick Reset (2 min)
          </span>
        </motion.button>

        {/* Specialized Modules Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={module.action}
                className={`bg-gradient-to-br ${module.color} text-white p-6 rounded-2xl text-left shadow-lg relative overflow-hidden group`}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-3 opacity-90" />
                  <h3 className="text-xl font-medium mb-1">{module.title}</h3>
                  <p className="text-white/80 text-sm">{module.description}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-[#6B7B6B] text-sm"
        >
          Choose a session or tap Quick Reset for immediate relief
        </motion.p>
      </div>
    </div>
  );
}
