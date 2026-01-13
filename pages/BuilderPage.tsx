
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Download, Eye, 
  User as UserIcon, Briefcase, GraduationCap, 
  Code, Award, Plus, Trash2, ChevronDown, Rocket, 
  Languages, Globe, Star, MoveUp, MoveDown, Layout, Sidebar
} from 'lucide-react';
import { ResumeData, TemplateType, SkillCategory, Experience, Project, Education, User } from '../types';
import { SAMPLE_RESUME } from '../constants';
import ResumePreview from '../components/ResumePreview';

const BuilderPage: React.FC = () => {
  const { resumeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('cv_user');
    if (!savedUser) {
      navigate('/auth');
      return;
    }
    const user = JSON.parse(savedUser) as User;
    setCurrentUser(user);

    const storageKey = `cv_resumes_${user.id}`;
    const savedResumes = localStorage.getItem(storageKey);
    const templateParam = searchParams.get('template') as TemplateType;
    
    let currentResume: ResumeData;
    if (savedResumes) {
      const allResumes = JSON.parse(savedResumes);
      const found = allResumes.find((r: ResumeData) => r.id === resumeId);
      currentResume = found ? (templateParam ? { ...found, templateId: templateParam } : found) 
                           : { ...SAMPLE_RESUME, id: resumeId || 'new', templateId: templateParam || TemplateType.MODERN };
    } else {
      currentResume = { ...SAMPLE_RESUME, id: resumeId || 'new', templateId: templateParam || TemplateType.MODERN };
    }
    setResume(currentResume);
  }, [resumeId, searchParams, navigate]);

  const updateResume = useCallback((updates: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    if (!currentUser) return;
    setResume(prev => {
      if (!prev) return prev;
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      
      const storageKey = `cv_resumes_${currentUser.id}`;
      const saved = localStorage.getItem(storageKey);
      let allResumes = saved ? JSON.parse(saved) : [];
      const index = allResumes.findIndex((r: ResumeData) => r.id === next.id);
      if (index > -1) {
        allResumes[index] = next;
      } else {
        allResumes.push(next);
      }
      localStorage.setItem(storageKey, JSON.stringify(allResumes));
      return next;
    });
  }, [currentUser]);

  if (!resume || !currentUser) return <div className="min-h-screen bg-black flex items-center justify-center font-mono animate-pulse">BOOTING ENGINE...</div>;

  const addArrayItem = (key: keyof ResumeData, newItem: any) => {
    updateResume(p => ({ ...p, [key]: [...(p[key] as any[]), newItem] }));
  };

  const removeArrayItem = (key: keyof ResumeData, idOrIndex: string | number) => {
    updateResume(p => {
      const current = p[key] as any[];
      if (typeof idOrIndex === 'string') {
        return { ...p, [key]: current.filter(item => item.id !== idOrIndex) };
      }
      return { ...p, [key]: current.filter((_, i) => i !== idOrIndex) };
    });
  };

  const updateArrayItem = (key: keyof ResumeData, index: number, updates: any) => {
    updateResume(p => {
      const current = [...(p[key] as any[])];
      current[index] = { ...current[index], ...updates };
      return { ...p, [key]: current };
    });
  };

  const moveArrayItem = (key: keyof ResumeData, index: number, direction: 'up' | 'down') => {
    updateResume(p => {
      const current = [...(p[key] as any[])];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= current.length) return p;
      [current[index], current[newIndex]] = [current[newIndex], current[index]];
      return { ...p, [key]: current };
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-blue-500/30">
      <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 flex items-center justify-between no-print sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <input 
              type="text" 
              value={resume.title}
              onChange={(e) => updateResume({ title: e.target.value })}
              className="bg-transparent border-none focus:ring-0 font-bold text-sm min-w-[150px] p-0 hover:text-blue-400 transition-colors"
            />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500">Live Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => setIsMobilePreview(false)} className={`p-1.5 rounded-lg transition-all ${!isMobilePreview ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}><Sidebar size={14}/></button>
            <button onClick={() => setIsMobilePreview(true)} className={`p-1.5 rounded-lg transition-all ${isMobilePreview ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}><Eye size={14}/></button>
          </div>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <select 
            value={resume.templateId}
            onChange={(e) => updateResume({ templateId: e.target.value as TemplateType })}
            className="bg-[#111] border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none hover:border-white/20 transition-all"
          >
            <option value={TemplateType.MODERN}>Modern Inter</option>
            <option value={TemplateType.EXECUTIVE}>Executive Serif</option>
            <option value={TemplateType.IIT_PLACEMENT}>IIT Placement</option>
            <option value={TemplateType.TECH_SIDEBAR}>Tech Sidebar</option>
            <option value={TemplateType.ELEGANT}>Elegant Serif</option>
            <option value={TemplateType.PURE_ATS}>Strict ATS</option>
            <option value={TemplateType.CLASSIC}>Classic Professional</option>
            <option value={TemplateType.CREATIVE_TECH}>Creative Tech</option>
            <option value={TemplateType.GOVT_BIO}>Govt Bio-data</option>
          </select>
          <button 
            onClick={() => window.print()} 
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] active:scale-95"
          >
            <Download size={14} /> PDF
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className={`w-full md:w-[500px] bg-[#0a0a0a] border-r border-white/5 flex flex-col no-print ${isMobilePreview ? 'hidden' : 'block'}`}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-40">
            
            <Accordion title="Profile & Contact" icon={<UserIcon size={18}/>} isOpen={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" value={resume.personalInfo.fullName} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, fullName: v }}))} />
                <Input label="Email" value={resume.personalInfo.email} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, email: v }}))} />
                <Input label="Phone" value={resume.personalInfo.phone} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, phone: v }}))} />
                <Input label="Location" value={resume.personalInfo.location} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, location: v }}))} />
                <Input label="LinkedIn" value={resume.personalInfo.linkedin} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, linkedin: v }}))} />
                <Input label="GitHub" value={resume.personalInfo.github} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, github: v }}))} />
                <Input label="Portfolio" value={resume.personalInfo.portfolio} onChange={(v) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, portfolio: v }}))} />
              </div>
              <div className="mt-6">
                <label className="text-[10px] uppercase font-black text-gray-500 block mb-2 tracking-widest">Professional Summary</label>
                <textarea 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-xs min-h-[120px] focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700 leading-relaxed" 
                  placeholder="Passionate engineer with X years experience..."
                  value={resume.personalInfo.summary}
                  onChange={(e) => updateResume(p => ({ ...p, personalInfo: { ...p.personalInfo, summary: e.target.value }}))}
                />
              </div>
            </Accordion>

            <Accordion title="Work Experience" icon={<Briefcase size={18}/>} isOpen={activeTab === 'experience'} onClick={() => setActiveTab('experience')}>
              {resume.experience.map((exp, i) => (
                <div key={exp.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 relative group hover:border-white/20 transition-all">
                  <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveArrayItem('experience', i, 'up')} className="p-1 hover:text-blue-400"><MoveUp size={14}/></button>
                    <button onClick={() => moveArrayItem('experience', i, 'down')} className="p-1 hover:text-blue-400"><MoveDown size={14}/></button>
                    <button onClick={() => removeArrayItem('experience', exp.id)} className="p-1 text-red-500/70 hover:text-red-400"><Trash2 size={14}/></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Company" value={exp.company} onChange={(v) => updateArrayItem('experience', i, { company: v })} />
                    <Input label="Role" value={exp.role} onChange={(v) => updateArrayItem('experience', i, { role: v })} />
                    <Input label="Dates" placeholder="e.g. Jan 2023 - Present" value={exp.startDate} onChange={(v) => updateArrayItem('experience', i, { startDate: v })} />
                    <Input label="Location" value={exp.location} onChange={(v) => updateArrayItem('experience', i, { location: v })} />
                  </div>
                  <textarea 
                    placeholder="Description (use bullets •)"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-[11px] min-h-[100px] focus:border-blue-500/50 outline-none"
                    value={exp.description}
                    onChange={(e) => updateArrayItem('experience', i, { description: e.target.value })}
                  />
                </div>
              ))}
              <button onClick={() => addArrayItem('experience', { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '', location: '' })} className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-gray-500 hover:text-white">+ Add Experience</button>
            </Accordion>

            <Accordion title="Internships" icon={<Globe size={18}/>} isOpen={activeTab === 'internships'} onClick={() => setActiveTab('internships')}>
              {resume.internships.map((int, i) => (
                <div key={int.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 relative group">
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                    <button onClick={() => removeArrayItem('internships', int.id)} className="p-1 text-red-500"><Trash2 size={14}/></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Organization" value={int.company} onChange={(v) => updateArrayItem('internships', i, { company: v })} />
                    <Input label="Role" value={int.role} onChange={(v) => updateArrayItem('internships', i, { role: v })} />
                    <Input label="Duration" value={int.startDate} onChange={(v) => updateArrayItem('internships', i, { startDate: v })} />
                  </div>
                  <textarea placeholder="Key Contributions..." className="w-full bg-black border border-white/10 rounded-xl p-3 text-[11px] min-h-[80px]" value={int.description} onChange={(e) => updateArrayItem('internships', i, { description: e.target.value })} />
                </div>
              ))}
              <button onClick={() => addArrayItem('internships', { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '', location: '' })} className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500">+ Add Internship</button>
            </Accordion>

            <Accordion title="Projects" icon={<Rocket size={18}/>} isOpen={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>
              {resume.projects.map((proj, i) => (
                <div key={proj.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 relative group">
                  <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                  <Input label="Project Name" value={proj.name} onChange={(v) => updateArrayItem('projects', i, { name: v })} />
                  <Input label="Live/Repo Link" value={proj.link} onChange={(v) => updateArrayItem('projects', i, { link: v })} />
                  <div className="mt-3">
                    <Input label="Tech Stack" placeholder="React, Node, etc." value={proj.technologies.join(', ')} onChange={(v) => updateArrayItem('projects', i, { technologies: v.split(',').map(s => s.trim()) })} />
                  </div>
                  <textarea placeholder="Impact & Details" className="w-full bg-black border border-white/10 rounded-xl p-3 text-[11px] mt-3 min-h-[80px]" value={proj.description} onChange={(e) => updateArrayItem('projects', i, { description: e.target.value })} />
                </div>
              ))}
              <button onClick={() => addArrayItem('projects', { id: Date.now().toString(), name: '', description: '', technologies: [], link: '' })} className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white">+ Add Technical Project</button>
            </Accordion>

            <Accordion title="Education" icon={<GraduationCap size={18}/>} isOpen={activeTab === 'education'} onClick={() => setActiveTab('education')}>
              {resume.education.map((edu, i) => (
                <div key={edu.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 relative group">
                  <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Institution" value={edu.institution} onChange={(v) => updateArrayItem('education', i, { institution: v })} />
                    <Input label="Degree/Course" value={edu.degree} onChange={(v) => updateArrayItem('education', i, { degree: v })} />
                    <Input label="GPA / CGPA" value={edu.grade} onChange={(v) => updateArrayItem('education', i, { grade: v })} />
                    <Input label="Timeline" value={edu.startDate} onChange={(v) => updateArrayItem('education', i, { startDate: v })} />
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('education', { id: Date.now().toString(), institution: '', degree: '', grade: '', startDate: '', endDate: '' })} className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white">+ Add Education Entry</button>
            </Accordion>

            <Accordion title="Skills" icon={<Code size={18}/>} isOpen={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>
              {resume.skillCategories.map((cat, i) => (
                <div key={cat.id} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 relative group">
                  <button onClick={() => removeArrayItem('skillCategories', cat.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                  <Input label="Category Label" value={cat.category} onChange={(v) => updateArrayItem('skillCategories', i, { category: v })} />
                  <textarea 
                    placeholder="Skills (comma separated)" 
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-[11px] mt-3" 
                    value={cat.skills.join(', ')} 
                    onChange={(e) => updateArrayItem('skillCategories', i, { skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })} 
                  />
                </div>
              ))}
              <button onClick={() => addArrayItem('skillCategories', { id: Date.now().toString(), category: '', skills: [] })} className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white">+ New Category</button>
            </Accordion>

            <Accordion title="Achievements & POR" icon={<Star size={18}/>} isOpen={activeTab === 'extras'} onClick={() => setActiveTab('extras')}>
              <div className="space-y-6">
                <ListInput label="Professional Achievements" items={resume.achievements} onUpdate={(items) => updateResume({ achievements: items })} />
                <ListInput label="Positions of Responsibility" items={resume.por} onUpdate={(items) => updateResume({ por: items })} />
                <ListInput label="Certifications" items={resume.certifications} onUpdate={(items) => updateResume({ certifications: items })} />
                <ListInput label="Languages" items={resume.languages} onUpdate={(items) => updateResume({ languages: items })} />
              </div>
            </Accordion>

          </div>
        </aside>

        <section className={`flex-1 bg-[#111] overflow-y-auto no-print relative group ${!isMobilePreview ? 'hidden md:block' : 'block'}`}>
          <div className="min-h-full flex items-start justify-center p-8 md:p-14">
             <div className="item-transition transform scale-[0.8] lg:scale-100 origin-top shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <ResumePreview data={resume} />
             </div>
          </div>
        </section>
      </div>

      <div className="hidden print:block bg-white h-full w-full">
        <ResumePreview data={resume} isPrinting={true} />
      </div>
    </div>
  );
};

const Accordion = ({ title, icon, children, isOpen, onClick }: { title: string, icon: React.ReactNode, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className={`border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#0f0f0f] shadow-2xl border-white/10 ring-1 ring-white/5' : 'hover:bg-white/5'}`}>
    <button onClick={onClick} className="w-full flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500'}`}>{icon}</div>
        <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${isOpen ? 'text-white' : 'text-gray-500'}`}>{title}</span>
      </div>
      <ChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-white' : 'text-gray-700'}`} size={16}/>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
          <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="space-y-2">
    <label className="text-[9px] uppercase font-black text-gray-600 block tracking-widest">{label}</label>
    <input 
      type="text" 
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-800"
    />
  </div>
);

const ListInput = ({ label, items, onUpdate }: { label: string, items: string[], onUpdate: (items: string[]) => void }) => {
  const [input, setInput] = useState('');
  return (
    <div className="space-y-3">
      <label className="text-[9px] uppercase font-black text-gray-500 tracking-widest">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), input && onUpdate([...items, input]), setInput(''))}
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-[10px] focus:border-blue-500/50 outline-none"
          placeholder={`Add ${label.toLowerCase()}...`}
        />
        <button onClick={() => { if(input) onUpdate([...items, input]); setInput(''); }} className="px-4 bg-white text-black rounded-xl text-xs font-black">+</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {items.map((it, i) => (
          <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-bold flex items-center gap-3 group/chip hover:border-white/30 transition-all">
            {it}
            <button onClick={() => onUpdate(items.filter((_, idx) => idx !== i))} className="text-gray-500 hover:text-red-400">×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BuilderPage;
