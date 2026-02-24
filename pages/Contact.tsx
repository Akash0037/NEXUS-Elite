
import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Package } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-black font-orbitron mb-6 md:mb-8 glitch">SUMMON <span className="text-yellow-400">US</span></h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12">Transmit your signal. Our cyber agents respond across the grid—24/7, 365 cycles.</p>
          
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 glass p-4 md:p-6 rounded-2xl border-l-4 border-yellow-400 animate-pulse">
              <div className="p-3 md:p-4 bg-yellow-400/10 rounded-xl text-yellow-400">
                <MapPin size={20} className="md:hidden" />
                <MapPin size={24} className="hidden md:block" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs md:text-sm text-gray-500">Location</h4>
                <p className="text-base md:text-lg font-orbitron">Cyber Hub 01, Neo Tokyo</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6 glass p-4 md:p-6 rounded-2xl border-l-4 border-blue-400 animate-pulse">
              <div className="p-3 md:p-4 bg-blue-400/10 rounded-xl text-blue-400">
                <Mail size={20} className="md:hidden" />
                <Mail size={24} className="hidden md:block" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs md:text-sm text-gray-500">Relay</h4>
                <p className="text-base md:text-lg font-orbitron">hq@nexusetite.io</p>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-16 glass p-6 md:p-8 rounded-[25px] md:rounded-[40px] relative overflow-hidden">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <Package className="text-yellow-400 animate-spin" size={20} />
              <h3 className="text-lg md:text-xl font-black font-orbitron glitch">TRACK TRANSMISSION</h3>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter Transmission ID (NX-XXXXXX)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="w-full py-4 bg-yellow-400 text-black font-bold font-orbitron rounded-2xl hover:scale-[1.02] transition-transform">
                LOCATE SIGNAL
              </button>
            </div>
            {/* Visual Progress Bar Mockup */}
            <div className="mt-8 relative">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse"
                />
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Initialized</span>
                <span>Transmitting</span>
                <span>Received</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass p-6 md:p-12 rounded-[30px] md:rounded-[50px] border border-white/5 relative overflow-hidden"
        >
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400/10 via-blue-400/10 to-white/5 animate-pulse" />
          </div>
          <form className="space-y-4 md:space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Gamertag</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-yellow-400" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-yellow-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Signal Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-yellow-400 appearance-none">
                <option>Technical Support</option>
                <option>Billing Query</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Transmission</label>
              <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"></textarea>
            </div>
            <button className="group w-full py-5 bg-white text-black font-black font-orbitron rounded-full flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all glitch">
              SEND SIGNAL <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform animate-pulse" />
            </button>
          </form>
        </motion.div>
      </div>
      {/* Cyberpunk background visuals */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465101046530-73398c7f1d0c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 animate-pulse" />
      </div>
    </div>
  );
};

export default Contact;
// Rename for new structure
// Summon Us
