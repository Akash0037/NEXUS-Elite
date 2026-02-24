
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Search, Tag, Check, Zap, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const MerchAddToCartButton = ({ item, variant = 'primary' }: { item: Product, variant?: 'primary' | 'icon' }) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  if (variant === 'icon') {
    return (
      <div className="relative">2mk
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              className="absolute inset-0 bg-yellow-400/30 rounded-full pointer-events-none"
            />
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleAdd}
          className={`transition-colors ${isAnimating ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
        >
          {isAnimating ? <Check size={20} strokeWidth={3} /> : <ShoppingBag size={20} />}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1, border: '1px solid #facc15' }}
            animate={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 rounded-full pointer-events-none z-10"
          />
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAdd}
        className={`px-6 py-3 text-sm font-black font-orbitron rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${isAnimating
          ? 'bg-yellow-400 text-black scale-105'
          : 'bg-white text-black hover:bg-yellow-400 hover:scale-105'
          }`}
      >
        <AnimatePresence mode="wait">
          {isAnimating ? (
            <motion.div
              key="check"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              DEPLOYED <Check size={16} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="add"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              ACQUIRE GEAR <ShoppingBag size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/* ───────────────── Merch Quick View Modal ───────────────── */
const MerchQuickViewModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl md:rounded-[40px] flex flex-col lg:flex-row border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] z-[1005]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 bg-black/60 hover:bg-yellow-400 hover:text-black rounded-full transition-all border border-white/20 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div className="w-full lg:w-1/2 h-[200px] sm:h-[260px] lg:h-auto lg:min-h-[380px] bg-[#080808] relative flex-shrink-0 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {product.isFeatured && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-lg">RARE DROP</div>
              <div className="glass px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white">LIMITED</div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-5 sm:p-7 md:p-9 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">LIFESTYLE</div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <Zap size={12} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">In Stock</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-orbitron mb-3 tracking-tighter italic leading-none text-white">
            {product.name}
          </h2>

          <p className="text-gray-400 text-sm mb-5 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="mb-5">
            <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-2">Size</div>
            <div className="grid grid-cols-5 gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="py-2.5 border border-white/10 rounded-xl font-bold text-xs hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all active:scale-90">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-5 border-t border-white/10">
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Price</span>
              <span className="text-3xl md:text-4xl font-black font-orbitron text-yellow-400">${product.price}</span>
            </div>
            <div className="w-full sm:w-auto">
              <MerchAddToCartButton item={product} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};


const Merchandise: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const merchItems = PRODUCTS.filter(p => p.category === 'Merch');



  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 border-b border-yellow-400/20 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tighter mb-2 md:mb-4 italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            THE ARMORY
          </h1>
          <p className="text-blue-400 font-black tracking-[0.15em] md:tracking-[0.3em] uppercase text-xs md:text-sm">Cyberpunk Streetwear Showcase</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Filter gear..."
              className="bg-black/40 border border-yellow-400/20 rounded-xl px-4 md:px-6 py-3 text-sm focus:outline-none focus:border-blue-400 transition-all w-full md:w-64 uppercase tracking-widest font-black text-yellow-400"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <AnimatePresence>
          {merchItems.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`merch-card-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
              className="group relative border border-blue-400/20 rounded-3xl bg-gradient-to-br from-black via-[#0a0a0a] to-blue-400/5 shadow-[0_0_40px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.18)] cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* 3D Rotating Model Placeholder */}
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-[#0a0a0a] relative border border-yellow-400/10 flex items-center justify-center">
                <motion.img
                  layoutId={`merch-image-${item.id}`}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover mix-blend-lighten grayscale group-hover:grayscale-0 transition-all duration-700 rotate-0 group-hover:rotate-12"
                />
                {/* Cyberpunk Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-400/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-md">
                  <MerchAddToCartButton item={item} />
                </div>
                {item.isFeatured && (
                  <div className="absolute top-6 left-6 bg-yellow-400 text-black px-4 py-1.5 rounded-xl text-[10px] font-black font-orbitron uppercase tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                    Rare Drop
                  </div>
                )}
              </div>
              <div className="mt-8 flex justify-between items-start px-2">
                <div>
                  <h3 className="text-xl font-black font-orbitron group-hover:text-blue-400 transition-colors italic tracking-tight">{item.name}</h3>
                  <p className="text-yellow-400 text-[10px] mt-1 uppercase tracking-[0.3em] font-black">Nexus Core Selection</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black block text-blue-400 font-orbitron italic">${item.price}</span>
                  <div className="mt-3 flex justify-end">
                    <MerchAddToCartButton item={item} variant="icon" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MerchQuickViewModal
            product={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

      <section className="mt-20 md:mt-40 p-8 md:p-16 lg:p-24 rounded-[40px] md:rounded-[80px] bg-gradient-to-br from-blue-400 via-yellow-400 to-pink-500 relative overflow-hidden group/banner shadow-[0_0_80px_rgba(59,130,246,0.2)]">
        <div className="relative z-10 text-black flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black font-orbitron tracking-tighter leading-none mb-4 md:mb-6 italic">CYBER DROP<br />PROTOCOL</h2>
            <p className="text-black/80 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">Unlock 20% discount on initial apparel deployment.</p>
          </div>
          <button className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-8 bg-black text-blue-400 font-black font-orbitron rounded-full hover:scale-110 transition-transform shadow-2xl active:scale-95 group-hover/banner:bg-white group-hover/banner:text-black text-sm md:text-base">
            ACQUIRE CODE
          </button>
        </div>
        <div className="absolute top-0 right-0 text-[20rem] font-black text-blue-400/10 select-none -translate-y-1/3 font-orbitron italic">DROP</div>
      </section>
    </div>
  );
};

export default Merchandise;
// Rename for new structure
// The Armory
