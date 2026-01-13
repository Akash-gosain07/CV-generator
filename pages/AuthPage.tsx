
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Github } from 'lucide-react';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Akash Kumar',
      email: email || 'demo@cvgenius.app'
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 rotate-12">
            <span className="text-black font-black text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-gray-500 mt-2">The future of resume building starts here.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-12 py-4 focus:border-white focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-12 py-4 focus:border-white focus:outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-12 py-4 focus:border-white focus:outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 group"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex-1 h-px bg-white/5" />
          OR
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4">
          <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all">
            <Github size={20} />
            Continue with Github
          </button>
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white font-bold hover:underline"
          >
            {isLogin ? 'Create one' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
