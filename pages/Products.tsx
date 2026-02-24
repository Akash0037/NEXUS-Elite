import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ShoppingCart, Star, Cpu, Zap, Activity, Check, ShieldAlert, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const AddToCartButton = ({ product, className = "" }: { product: Product, className?: string }) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1, border: '2px solid #facc15' }}
            animate={{ scale: 2, opacity: 0, border: '0px solid #facc15' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl pointer-events-none z-10"
          />
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleAdd}
        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xl relative overflow-hidden group/btn ${isAnimating ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-yellow-400'
          }`}
      >
        <AnimatePresence mode="wait">
          {isAnimating ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <Check size={18} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="group-hover/btn:scale-110 transition-transform"
            >
              <ShoppingCart size={16} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-xl" />
      </motion.button>
    </div>
  );
};

/* ───────────────────── Quick View Modal ───────────────────── */
const QuickViewModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
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
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl md:rounded-[40px] flex flex-col lg:flex-row border border-white/10 shadow-[0_0_80px_rgba(250,204,21,0.12)] z-[1005]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 bg-black/60 hover:bg-yellow-400 hover:text-black rounded-full transition-all border border-white/20 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="w-full lg:w-1/2 h-[200px] sm:h-[260px] lg:h-auto lg:min-h-[380px] bg-black relative flex-shrink-0 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="glass px-3 py-1 rounded-lg flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">In Stock</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 p-5 sm:p-7 md:p-9 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert size={10} /> {product.category}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
              ))}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-orbitron mb-3 tracking-tighter italic leading-none">
            {product.name}
          </h2>

          <p className="text-gray-400 text-sm mb-5 leading-relaxed font-medium border-l-2 border-white/10 pl-4">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Latency</div>
              <div className="text-base font-black font-orbitron text-green-400">0.002 ms</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Reliability</div>
              <div className="text-base font-black font-orbitron text-yellow-400">99.9%</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block mb-1 font-bold">Price</span>
              <span className="text-3xl md:text-4xl font-black font-orbitron text-yellow-400">${product.price}</span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};


const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Gear', 'PC', 'Console'];

  const filteredProducts = PRODUCTS.filter(p => {
    const isHardware = p.category !== 'Merch';
    if (activeCategory === 'All') return isHardware;
    return isHardware && p.category === activeCategory;
  });



  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-2 sm:px-4 md:px-6 max-w-full md:max-w-7xl mx-auto">
      <header className="mb-8 md:mb-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex gap-4 opacity-50 hidden md:flex">
          <Activity className="text-yellow-400 animate-pulse" size={32} />
          <Cpu className="text-blue-400 animate-pulse delay-150" size={32} />
          <Zap className="text-yellow-400 animate-pulse delay-300" size={32} />
        </div>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-8xl font-black font-orbitron mb-2 md:mb-4 tracking-tighter italic">THE ARSENAL</h1>
        <p className="text-yellow-400 font-black uppercase tracking-[0.2em] md:tracking-[1em] text-[10px] xs:text-[12px] md:text-lg px-2 md:px-4">Weaponize your setup. Choose your power.</p>
        <div className="mt-6 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-4 px-1 md:px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 md:px-8 py-2 md:py-3 rounded-xl text-[9px] xs:text-[10px] md:text-xs font-black uppercase tracking-[0.08em] md:tracking-[0.2em] transition-all border ${activeCategory === cat
                ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-12">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-2xl xs:rounded-3xl md:rounded-[40px] overflow-hidden group border border-yellow-400/20 flex flex-col h-full relative transition-all shadow-[0_0_40px_rgba(250,204,21,0.08)] hover:shadow-[0_0_80px_rgba(250,204,21,0.18)] cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-48 xs:h-60 sm:h-72 overflow-hidden bg-black/40 flex flex-col justify-end">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                <div className="absolute top-3 xs:top-4 left-3 xs:left-4 flex items-center gap-2">
                  <div className="bg-yellow-400 text-black px-2 xs:px-3 py-1 rounded-full text-[9px] xs:text-[10px] font-black uppercase tracking-widest">
                    {product.category}
                  </div>

                </div>
                {/* Weapon Power Meter */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Power Level</span>
                    <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(product.rating * 20, 100)}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>

              </div>
              <div className="p-4 xs:p-6 md:p-10 pt-0 flex flex-col flex-grow">
                <h3 className="text-xl xs:text-2xl md:text-3xl font-black font-orbitron mb-2 md:mb-4 group-hover:text-yellow-400 transition-colors leading-none tracking-tighter italic">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs xs:text-sm mb-4 md:mb-8 leading-relaxed font-medium line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[9px] xs:text-xs text-gray-500 uppercase tracking-widest block mb-1">Price unit</span>
                    <span className="text-xl xs:text-2xl md:text-3xl font-black font-orbitron">
                      ${product.price}
                    </span>
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent absolute bottom-0" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
