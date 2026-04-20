import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import campusImage from "../../imports/Gemini_Generated_Image_1lrx0m1lrx0m1lrx.png";

export default function Onboarding() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Store username in localStorage
      localStorage.setItem("calmUsername", username.trim());
      navigate("/vibe-check");
    }
  };

  const handleLogin = () => {
    // For now, just navigate to dashboard
    // In a real app, this would authenticate
    const savedUsername = localStorage.getItem("calmUsername");
    if (savedUsername) {
      navigate("/dashboard");
    } else {
      setIsLogin(false);
      alert("Please create an account first");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6F5] via-[#E8ECE8] to-[#C9D9C9] relative overflow-hidden">
      {/* Campus archway background with overlay */}
      <div className="absolute inset-0">
        <img
          src={campusImage}
          alt="Campus at dawn"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F6F5]/60 via-[#E8ECE8]/70 to-[#C9D9C9]/60 backdrop-blur-sm" />
      </div>

      {/* Animated ambient light */}
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-5xl mb-3 text-[#2F4F3F]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >BreatheEasy</h1>
            <p className="text-[#6B7B6B] text-lg">
              Your personal wellness companion
            </p>
          </motion.div>

          {/* Frosted glass container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/40"
          >
            {!isLogin ? (
              // Sign-up flow
              <form onSubmit={handleStartJourney} className="space-y-6">
                <div>
                  <label 
                    htmlFor="username" 
                    className="block text-[#2F4F3F] mb-3 text-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    What username would you like to use?
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., CalmCampus24"
                    className="w-full px-4 py-4 bg-white/60 border-2 border-[#A8B9A8]/30 rounded-2xl text-[#2F4F3F] placeholder-[#A8B9A8] focus:border-[#A8B9A8] focus:outline-none transition-colors"
                    style={{
                      caretColor: "#A8B9A8",
                    }}
                    autoFocus
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#D97757] to-[#C66B4F] text-white py-4 rounded-2xl font-medium shadow-lg relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
                        "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative z-10">START YOUR JOURNEY</span>
                </motion.button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#A8B9A8]/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 text-[#6B7B6B]">
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Login button */}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/60 text-[#2F4F3F] py-4 rounded-2xl font-medium border-2 border-[#2F4F3F]/20 hover:border-[#2F4F3F]/40 transition-colors"
                >
                  LOG IN NOW
                </motion.button>
              </form>
            ) : (
              // Login flow
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                <div>
                  <h3 
                    className="text-2xl text-[#2F4F3F] mb-6 text-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Welcome Back
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-4 bg-white/60 border-2 border-[#A8B9A8]/30 rounded-2xl text-[#2F4F3F] placeholder-[#A8B9A8] focus:border-[#A8B9A8] focus:outline-none transition-colors"
                      style={{ caretColor: "#A8B9A8" }}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-white/60 border-2 border-[#A8B9A8]/30 rounded-2xl text-[#2F4F3F] placeholder-[#A8B9A8] focus:border-[#A8B9A8] focus:outline-none transition-colors"
                      style={{ caretColor: "#A8B9A8" }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#2F4F3F] to-[#3A5F4F] text-white py-4 rounded-2xl font-medium shadow-lg"
                >
                  LOG IN
                </motion.button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#A8B9A8]/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 text-[#6B7B6B]">
                      or
                    </span>
                  </div>
                </div>

                {/* Back to sign up */}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/60 text-[#2F4F3F] py-4 rounded-2xl font-medium border-2 border-[#2F4F3F]/20 hover:border-[#2F4F3F]/40 transition-colors"
                >
                  CREATE NEW ACCOUNT
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Footer tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-[#6B7B6B] text-sm mt-8"
          >
            Designed for students, by students
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}