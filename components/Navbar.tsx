
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, Gamepad2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setIsCartOpen } = useCart();

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Merch', path: '/merchandise' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Community', path: '/community' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      rotateX: -15,
      filter: 'blur(15px)',
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren" as const,
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -30, filter: 'blur(10px)' },
    open: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-8 py-3 relative">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-yellow-400"
          >
            <Gamepad2 size={32} />
          </motion.div>
          <span className="text-2xl font-black font-orbitron tracking-tighter text-white group-hover:text-yellow-400 transition-colors">
            NEXUS<span className="text-yellow-400">ELITE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-widest hover:text-yellow-400 transition-colors relative py-1 ${location.pathname === link.path ? 'text-yellow-400' : 'text-gray-400'
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 shadow-[0_0_8px_#facc15]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-gray-400 hover:text-white transition-colors relative p-2"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={itemCount}
                className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_#facc15]"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="hidden md:block text-gray-400 hover:text-white transition-colors p-2"
          >
            <User size={20} />
          </button>

          <button
            className="md:hidden text-white hover:text-yellow-400 transition-colors p-2 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} className="text-yellow-400" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} className="text-white" strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur to focus on menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] md:hidden"
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ perspective: "1000px" }}
              className="md:hidden absolute top-24 left-6 right-6 glass rounded-[32px] p-8 flex flex-col gap-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-[100]"
            >
              {/* Background scanning effect */}
              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-yellow-400/30 shadow-[0_0_15px_#facc15] z-0 pointer-events-none"
              />

              {navLinks.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    className={`text-3xl font-black font-orbitron py-3 flex items-center justify-between group transition-all ${location.pathname === link.path ? 'text-yellow-400 translate-x-2' : 'text-white'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="tracking-tighter italic">{link.name}</span>
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="mobile-indicator"
                        className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-6 mt-2 border-t border-white/10">
                <button
                  onClick={() => { navigate('/auth'); setIsOpen(false); }}
                  className="w-full text-xl font-black font-orbitron py-4 flex items-center justify-center gap-3 bg-white/5 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="tracking-tighter italic uppercase">Account Protocol</span>
                </button>
              </motion.div>

              {/* Decorative data readout */}
              <div className="flex justify-between mt-6 opacity-30 text-[8px] font-black font-orbitron tracking-widest uppercase italic">
                <span>Core: Operational</span>
                <span>Signal: High</span>
                <span>Node: US-WEST-2</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
