
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Zap, Globe, FileText, ArrowRight } from 'lucide-react';
import Intro from '../components/Intro';

const LandingPage: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) return <Intro onComplete={() => setShowIntro(false)} />;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-black font-bold">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">CV-GENIUS</span>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/templates" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Templates</Link>
            <Link to="/auth" className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6 inline-block">
              Redefining Recruitment
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight">
              Craft your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Professional DNA.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ditch the generic templates. Build high-impact, ATS-optimized resumes designed to pass through filters and impress human eyes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 group">
                Create My Resume <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/templates" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                Browse Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-blue-400" />}
              title="100% ATS-Friendly"
              description="Built following strict industry standards to ensure your resume is parsed correctly by modern applicant tracking systems."
            />
            <FeatureCard 
              icon={<Zap className="text-purple-400" />}
              title="IIT/Placement Style"
              description="Proven formats used by students from India's top institutes like IITs, NITs, and BITS for maximum success."
            />
            <FeatureCard 
              icon={<Sparkles className="text-orange-400" />}
              title="Smart Suggestions"
              description="Get real-time feedback and phrasing tips to highlight your achievements effectively."
            />
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="relative bg-[#0f0f0f] border border-white/10 rounded-3xl p-4 md:p-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl" />
            <img 
              src="https://picsum.photos/seed/resume/1200/800" 
              alt="Dashboard Preview" 
              className="rounded-2xl border border-white/5 shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">C</span>
            </div>
            <span className="font-bold tracking-tight">CV-GENIUS</span>
          </div>
          <div className="flex gap-10 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-gray-600">© 2024 CV-GENIUS. Engineered for success in India.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500">
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default LandingPage;
