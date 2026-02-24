
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Cpu, Globe } from 'lucide-react';

const BentoCard = ({ children, className, delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -10, 
        scale: 1.01,
        transition: { duration: 0.3 } 
      }}
      className={`glass rounded-[25px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden group border border-white/10 shadow-xl ${className}`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 blur-[80px] group-hover:bg-yellow-400/20 transition-all duration-700" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
      <BentoCard className="sm:col-span-2 md:row-span-2 flex flex-col justify-end gap-4 md:gap-6" delay={0.1}>
        <div className="text-yellow-400 mb-2 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          <Cpu size={48} className="md:hidden" strokeWidth={1} />
          <Cpu size={64} className="hidden md:block" strokeWidth={1} />
        </div>
        <div>
          <h3 className="text-2xl md:text-4xl font-black font-orbitron tracking-tighter mb-2 md:mb-4 italic">Hyperion Engines</h3>
          <p className="text-gray-400 max-w-sm text-base md:text-lg font-medium leading-relaxed">
            Built with the latest quantum computing processors. Experience zero lag, infinite frames, and absolute dominance.
          </p>
        </div>
        <button className="mt-2 md:mt-4 px-6 md:px-10 py-3 md:py-4 bg-yellow-400 text-black font-black font-orbitron uppercase tracking-widest rounded-2xl w-full sm:w-fit hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95 text-sm md:text-base">
          Explore Architecture
        </button>
      </BentoCard>

      <BentoCard className="flex flex-col gap-3 md:gap-4 justify-center" delay={0.2}>
        <div className="p-2 md:p-3 bg-blue-400/10 rounded-2xl w-fit group-hover:bg-blue-400 group-hover:text-black transition-all">
          <Zap className="text-blue-400 group-hover:text-inherit" size={24} />
        </div>
        <h4 className="text-xl md:text-2xl font-black font-orbitron tracking-tighter italic">Instant Relay</h4>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Next-day global delivery on all gear.</p>
      </BentoCard>

      <BentoCard className="md:row-span-2 bg-gradient-to-b from-transparent to-blue-600/10 flex flex-col justify-between" delay={0.3}>
        <div>
          <div className="p-2 md:p-3 bg-yellow-400/10 rounded-2xl w-fit mb-4 md:mb-6 group-hover:animate-bounce">
            <Globe className="text-yellow-400" size={24} />
          </div>
          <h4 className="text-xl md:text-2xl font-black font-orbitron tracking-tighter italic mb-2 md:mb-4">Global Nexus</h4>
          <p className="text-gray-400 font-medium">Connect with 15M+ elite players in our dedicated low-latency lounge.</p>
        </div>
        <div className="h-32 w-full bg-white/5 rounded-3xl flex flex-col items-center justify-center font-orbitron text-xs tracking-[0.3em] font-black border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 text-yellow-400 mb-2 animate-pulse">● LIVE STATUS</span>
          <span className="relative z-10">TOKYO 12:44:03</span>
        </div>
      </BentoCard>

      <BentoCard className="flex flex-col gap-3 md:gap-4 justify-center" delay={0.4}>
        <div className="p-2 md:p-3 bg-green-400/10 rounded-2xl w-fit group-hover:bg-green-400 group-hover:text-black transition-all">
          <Shield className="text-green-400 group-hover:text-inherit" size={24} />
        </div>
        <h4 className="text-xl md:text-2xl font-black font-orbitron tracking-tighter italic">Titan Security</h4>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Military-grade protection for your data.</p>
      </BentoCard>
    </div>
  );
};

export default BentoGrid;
