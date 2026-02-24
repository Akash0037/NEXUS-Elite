
import React, { useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Products from './pages/Products';
import Merchandise from './pages/Merchandise';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import About from './pages/About';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * EnergyWipe: Triggered on route exit. 
 * Expands a neon yellow bar to cover the screen.
 */
const EnergyWipe = () => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    className="fixed inset-0 bg-yellow-400 z-[999] origin-bottom pointer-events-none"
  />
);

/**
 * EnergyWipeEntry: Triggered on route entry.
 * Retracts the neon yellow bar to reveal the new page.
 */
const EnergyWipeEntry = () => (
  <motion.div
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    className="fixed inset-0 bg-yellow-400 z-[999] origin-top pointer-events-none"
  />
);

/**
 * PageWrapper: Orchestrates the full cinematic transition.
 */
const PageWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative">
      <EnergyWipe />
      <EnergyWipeEntry />

      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          filter: 'blur(20px)',
          scale: 1.1,
          y: 20
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          filter: 'blur(20px)',
          scale: 0.9,
          y: -20
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * FooterParticles: High-performance particle engine for the footer.
 * Mixes circles and squares with randomized cinematic properties.
 */
const FooterParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      color: Math.random() > 0.4 ? '#facc15' : '#3b82f6',
      drift: (Math.random() - 0.5) * 150,
      isSquare: Math.random() > 0.7,
      blur: Math.random() > 0.5 ? 'blur(1px)' : 'blur(3px)',
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Radial bottom glow source */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-yellow-400/5 blur-[100px] rounded-full" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: '100%',
            x: `${p.x}%`,
            scale: 0,
            rotate: 0
          }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: '-10%',
            x: `${p.x + p.drift}%`,
            scale: [0, 1, 1, 0.5],
            rotate: p.isSquare ? 360 : 0
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isSquare ? '2px' : '50%',
            position: 'absolute',
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            filter: p.blur,
          }}
        />
      ))}

      {/* Occasional glitch horizontal lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 0.2, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 4,
            ease: "linear"
          }}
          className="absolute h-px w-64 bg-yellow-400/20 shadow-[0_0_10px_#facc15] z-0"
          style={{ top: `${20 + i * 25}%` }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400/5 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none" style={{ backgroundSize: '100% 2px, 3px 100%' }}></div>
    <motion.div
      animate={{
        x: ['-100%', '200%'],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-[30%] left-0 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rotate-[15deg] blur-sm"
    />
  </div>
);

import Events from './pages/Events';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-yellow-400 selection:text-black">
          <CustomCursor />
          <AnimatedBackground />
          <Navbar />
          <CartDrawer />
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
                <Route path="/merchandise" element={<PageWrapper><Merchandise /></PageWrapper>} />
                <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
                <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>

          {/* ──────────── Footer ──────────── */}
          <footer className="relative z-10 border-t border-yellow-400/10 bg-gradient-to-b from-[#050505] via-[#080808] to-[#0a0a0a] overflow-hidden">
            <FooterParticles />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
              {/* Top row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                {/* Brand */}
                <div>
                  <h2 className="text-2xl font-black font-orbitron tracking-tighter italic text-yellow-400 mb-3">
                    NEXUS ELITE
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                    Premium gaming gear, streetwear drops, and elite esports culture — all in one cyberpunk-forged hub.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {[
                      { label: 'Home', to: '/' },
                      { label: 'Arsenal', to: '/products' },
                      { label: 'Armory', to: '/merchandise' },
                      { label: 'About', to: '/about' },
                      { label: 'Contact', to: '/contact' },
                    ].map(link => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-medium"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socials / Newsletter */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-4">Stay Connected</h3>
                  <p className="text-gray-500 text-sm mb-4 max-w-xs">
                    Follow us for exclusive drops, event announcements, and community highlights.
                  </p>
                  <div className="flex gap-3">
                    {['Twitter', 'Discord', 'YouTube'].map(platform => (
                      <a
                        key={platform}
                        href="#"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-all"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent mb-6" />

              {/* Bottom bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 uppercase tracking-widest font-bold">
                <span>&copy; {new Date().getFullYear()} Nexus Elite Gaming. All rights reserved.</span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
