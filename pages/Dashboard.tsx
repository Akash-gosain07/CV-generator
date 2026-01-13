
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, MoreVertical, Trash2, Edit2, LogOut, Layout, Clock, User as UserIcon } from 'lucide-react';
import { User, ResumeData } from '../types';
import { SAMPLE_RESUME } from '../constants';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`cv_resumes_${user.id}`);
    if (saved) {
      setResumes(JSON.parse(saved));
    } else {
      // First time? Give them a sample
      const initial = [{ ...SAMPLE_RESUME, id: 'init-1', title: 'My First Resume' }];
      setResumes(initial);
      localStorage.setItem(`cv_resumes_${user.id}`, JSON.stringify(initial));
    }
  }, [user.id]);

  const createNew = () => {
    const id = `cv-${Date.now()}`;
    const newResume: ResumeData = {
      ...SAMPLE_RESUME,
      id,
      title: 'Untitled Resume',
      personalInfo: { ...SAMPLE_RESUME.personalInfo, fullName: user.name, email: user.email }
    };
    const updated = [newResume, ...resumes];
    setResumes(updated);
    localStorage.setItem(`cv_resumes_${user.id}`, JSON.stringify(updated));
    navigate(`/builder/${id}`);
  };

  const deleteResume = (id: string) => {
    const updated = resumes.filter(r => r.id !== id);
    setResumes(updated);
    localStorage.setItem(`cv_resumes_${user.id}`, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Side Nav */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-black font-bold">C</span>
          </div>
          <span className="text-lg font-bold">CV-GENIUS</span>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarItem icon={<Layout size={20} />} label="Dashboard" active />
          <Link to="/templates">
            <SidebarItem icon={<FileText size={20} />} label="Templates" />
          </Link>
          <Link to="/settings">
            <SidebarItem icon={<UserIcon size={20} />} label="Profile" />
          </Link>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500">Pick up where you left off or start fresh.</p>
          </div>
          <button 
            onClick={createNew}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-xl"
          >
            <Plus size={20} />
            Create New
          </button>
        </header>

        {/* Onboarding Checklist */}
        <div className="bg-[#0f0f0f] border border-blue-500/20 rounded-2xl p-6 mb-12">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-blue-400" />
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CheckItem label="Complete personal info" done={true} />
            <CheckItem label="Add 3 professional projects" done={resumes[0]?.projects.length >= 3} />
            <CheckItem label="Select an ATS template" done={true} />
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <motion.div
              layout
              key={resume.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="aspect-[3/4] p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => navigate(`/builder/${resume.id}`)}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => deleteResume(resume.id)}
                    className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                {/* Visual Mock of Resume */}
                <div className="w-full h-full bg-white/5 rounded shadow-inner p-4 space-y-2 opacity-30">
                  <div className="h-4 w-2/3 bg-white/20 rounded" />
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-20 w-full bg-white/5 rounded mt-4" />
                </div>
              </div>
              <div className="p-4 border-t border-white/5">
                <h4 className="font-bold truncate">{resume.title}</h4>
                <p className="text-xs text-gray-500 mt-1">Edited 2 hours ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-sm font-medium
    ${active ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}
  `}>
    {icon}
    {label}
  </div>
);

const CheckItem = ({ label, done }: { label: string, done: boolean }) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${done ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
      {done && <span className="text-[10px] text-white">✓</span>}
    </div>
    <span className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-white'}`}>{label}</span>
  </div>
);

export default Dashboard;
