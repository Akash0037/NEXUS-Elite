import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-orbitron mb-4 tracking-tighter italic">CONTROL ROOM</h1>
        <p className="text-green-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Admin Console</p>
      </header>
      <section className="mb-16">
        <h2 className="text-2xl md:text-4xl font-black font-orbitron mb-4 italic">System Status</h2>
        <div className="glass p-6 rounded-2xl mb-4">
          <p className="text-gray-400">All systems operational. No alerts.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl md:text-4xl font-black font-orbitron mb-4 italic">Admin Actions</h2>
        <div className="glass p-4 rounded-xl text-center">
          <button className="bg-green-400 text-black px-8 py-4 rounded-full font-black font-orbitron text-lg hover:bg-white transition-all">Deploy Update</button>
        </div>
      </section>
    </div>
  );
};

export default Admin;
// Control Room
