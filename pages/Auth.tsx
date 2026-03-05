
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, Facebook, Chrome, ShieldCheck, Zap } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gamertag, setGamertag] = useState('');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, gamertag: gamertag || email.split('@')[0] });
    navigate('/');
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.1, filter: 'blur(10px)' }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 md:pb-12 flex items-center justify-center px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-5xl glass rounded-[25px] md:rounded-[40px] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10"
      >
        {/* Left Side: Brand Visuals */}
        <div className="hidden md:flex md:w-1/2 bg-black/40 relative p-12 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-20 grayscale"
              alt="Gaming background"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-yellow-400/10" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-black font-orbitron italic tracking-tighter leading-none mb-6">
              JOIN THE <br /><span className="text-yellow-400">ELITE NEXUS</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck className="text-yellow-400" size={18} />
                <span>Verified Combat Status</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-widest">
                <Zap className="text-blue-400" size={18} />
                <span>Zero Latency Access</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.3em] mb-4">Established 20XX</p>
            <div className="flex gap-2">
              <div className="h-1 w-12 bg-yellow-400" />
              <div className="h-1 w-4 bg-white/20" />
              <div className="h-1 w-4 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-center bg-white/[0.01]">
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-white/5 p-1 rounded-2xl flex relative w-full max-w-[280px]">
              <motion.div
                className="absolute top-1 bottom-1 bg-yellow-400 rounded-xl z-0"
                initial={false}
                animate={{
                  left: isLogin ? '4px' : '50%',
                  right: isLogin ? '50%' : '4px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-xs font-black font-orbitron uppercase tracking-widest z-10 transition-colors ${isLogin ? 'text-black' : 'text-gray-500'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-xs font-black font-orbitron uppercase tracking-widest z-10 transition-colors ${!isLogin ? 'text-black' : 'text-gray-500'}`}
              >
                Initialize
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black font-orbitron tracking-tighter mb-2">
                  {isLogin ? 'RESUME SESSION' : 'USER INITIALIZATION'}
                </h3>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
                  {isLogin ? 'Enter your credentials to re-sync' : 'Complete the protocol to join'}
                </p>
              </div>

              <div className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="GAMERTAG"
                      value={gamertag}
                      onChange={(e) => setGamertag(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold tracking-widest focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all uppercase"
                    />
                  </div>
                )}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold tracking-widest focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all uppercase"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="ENCRYPTION KEY"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold tracking-widest focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button className="text-xs font-bold text-gray-500 hover:text-yellow-400 transition-colors uppercase tracking-widest">
                    Forgot Encryption Key?
                  </button>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-5 bg-white text-black font-black font-orbitron rounded-2xl flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all shadow-xl group"
              >
                <span className="uppercase tracking-widest">{isLogin ? 'Login Session' : 'Begin Deployment'}</span>
                {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 bg-transparent px-4">
                  External Auth
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                  <Chrome size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black font-orbitron uppercase tracking-widest text-gray-400 group-hover:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                  <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black font-orbitron uppercase tracking-widest text-gray-400 group-hover:text-white">Facebook</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
