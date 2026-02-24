import React from 'react';
import { motion } from 'framer-motion';

const Events: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-orbitron mb-4 tracking-tighter italic">BATTLE ARENA</h1>
        <p className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Tournaments, Missions, Champions</p>
      </header>
      {/* Live Battles */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-5xl font-black font-orbitron mb-6 italic">🔥 Live Battles</h2>
        <div className="glass p-6 rounded-2xl mb-4 flex items-center justify-between">
          <span className="text-lg font-bold text-yellow-400">Ongoing Tournament: Nexus Cup</span>
          <span className="text-sm font-bold text-white bg-yellow-400/10 px-4 py-2 rounded-xl">Prize Pool: <span className="text-yellow-400">$10,000</span></span>
          <span className="text-sm font-bold text-blue-400">Countdown: 02:14:36</span>
        </div>
      </section>
      {/* Upcoming Arenas */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-4xl font-black font-orbitron mb-4 italic">🎮 Upcoming Arenas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="text-xl font-black font-orbitron mb-2">Mission: Cyber Clash</h3>
            <p className="text-gray-400 mb-2">Starts: Feb 20, 2026</p>
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-black font-orbitron hover:bg-white transition-all">Select Mission</button>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="text-xl font-black font-orbitron mb-2">Mission: Quantum Showdown</h3>
            <p className="text-gray-400 mb-2">Starts: Mar 5, 2026</p>
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-black font-orbitron hover:bg-white transition-all">Select Mission</button>
          </div>
        </div>
      </section>
      {/* Join The War */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-4xl font-black font-orbitron mb-4 italic">🧬 Join The War</h2>
        <form className="glass p-6 rounded-2xl flex flex-col gap-4 max-w-md mx-auto">
          <input type="text" placeholder="Gamer Tag" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold" />
          <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold" />
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-black font-orbitron text-lg hover:bg-white transition-all animate-pulse">DEPLOY NOW</button>
        </form>
      </section>
      {/* Hall of Champions */}
      <section>
        <h2 className="text-2xl md:text-4xl font-black font-orbitron mb-4 italic">🏆 Hall of Champions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="text-xl font-black font-orbitron mb-2">Player: NeoX</h3>
            <p className="text-yellow-400 font-bold">Champion - Nexus Cup</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="text-xl font-black font-orbitron mb-2">Player: Cypher</h3>
            <p className="text-yellow-400 font-bold">Champion - Quantum Showdown</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
// Battle Arena
