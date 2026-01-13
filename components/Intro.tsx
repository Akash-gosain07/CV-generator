
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(onComplete, 5500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center"
          >
            <motion.div 
              className="w-24 h-24 mb-8 mx-auto border-4 border-white rounded-full flex items-center justify-center"
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="w-12 h-12 bg-white rounded-sm rotate-45" />
            </motion.div>
            <h2 className="text-xl font-light tracking-[0.5em] uppercase text-white/50">Initializing DNA</h2>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center"
          >
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: 120 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-50"
                />
              ))}
            </div>
            <h2 className="mt-8 text-2xl font-playfair italic">Structuring Experience...</h2>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center max-w-lg px-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              Build a resume that gets interviews.
            </h1>
            <p className="text-gray-400 text-lg">Modern. Minimal. ATS-Perfect.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-xs text-white/30 hover:text-white transition-colors uppercase tracking-widest"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default Intro;
