
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { TemplateType } from '../types';

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  const templates = [
    { id: TemplateType.CLASSIC, name: 'Classic Professional', description: 'Timeless single-column layout for experienced professionals.', tag: 'Popular' },
    { id: TemplateType.IIT_PLACEMENT, name: 'IIT/Placement Style', description: 'Optimized for campus placements and technical roles in India.', tag: 'Best for Students' },
    { id: TemplateType.MODERN, name: 'Modern Minimal', description: 'Clean aesthetic with generous white space for a contemporary look.', tag: 'ATS Safe' },
    { id: TemplateType.CREATIVE_TECH, name: 'Creative Tech', description: 'Bold typography and distinctive spacing for tech startups.', tag: 'Designers' },
    { id: TemplateType.GOVT_BIO, name: 'Govt/UPSC Bio-data', description: 'Rigid formal structure adhering to Indian traditional guidelines.', tag: 'Traditional' },
  ];

  const handleSelect = (templateId: string) => {
    // Generate a fresh ID for the new resume
    const newId = `cv-${Date.now()}`;
    navigate(`/builder/${newId}?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <header className="max-w-7xl mx-auto mb-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Templates Gallery</h1>
            <p className="text-gray-500">Pick a blueprint. All are guaranteed 100% ATS-friendly.</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all"
          >
            <div className="aspect-[3/4] bg-[#1a1a1a] p-8 overflow-hidden relative">
               <div className="absolute top-4 right-4 z-10">
                 <span className="px-3 py-1 bg-blue-500 text-[10px] font-bold rounded-full uppercase tracking-widest">{t.tag}</span>
               </div>
               
               {/* Visual Indicator of Template Type */}
               <div className="w-full h-full bg-white rounded-lg shadow-2xl p-6 flex flex-col gap-3 opacity-80 group-hover:scale-105 transition-transform duration-500">
                  <div className={`h-6 w-1/2 bg-gray-200 rounded ${t.id === TemplateType.CLASSIC ? 'mx-auto' : ''}`} />
                  <div className="h-2 w-full bg-gray-100 rounded" />
                  <div className="h-2 w-full bg-gray-100 rounded" />
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="h-2 w-1/4 bg-blue-100 rounded" />
                    <div className="h-10 w-full bg-gray-50 rounded" />
                  </div>
               </div>
               
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleSelect(t.id)}
                    className="px-8 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-all shadow-2xl"
                  >
                    Use Template
                  </button>
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{t.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t.description}</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                <CheckCircle2 size={14} /> ATS Optimized
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
