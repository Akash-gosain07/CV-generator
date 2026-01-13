
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, Shield, Bell, Key } from 'lucide-react';
import { User } from '../types';

interface SettingsPageProps {
  user: User;
  onUpdate: (user: User) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onUpdate({ ...user, name, email });
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <header className="max-w-3xl mx-auto mb-12 flex items-center gap-6">
        <Link to="/dashboard" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        <section className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <UserIcon size={20} className="text-blue-400" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus:border-white focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus:border-white focus:outline-none transition-all"
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            Save Changes
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard icon={<Key />} title="Security" description="Manage your password and 2FA settings." />
          <SettingsCard icon={<Shield />} title="Privacy" description="Control what data is shared with employers." />
          <SettingsCard icon={<Bell />} title="Notifications" description="Email alerts for job matches and tips." />
        </section>
      </main>
    </div>
  );
};

const SettingsCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 bg-[#0f0f0f] border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-pointer group">
    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <h4 className="font-bold mb-1">{title}</h4>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default SettingsPage;
