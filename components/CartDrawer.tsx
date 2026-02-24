
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#0a0a0a] border-l border-white/10 z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <ShoppingBag className="text-yellow-400" size={20} />
                <h2 className="text-lg md:text-2xl font-black font-orbitron uppercase tracking-tighter">Your Payload</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="font-orbitron font-bold uppercase tracking-widest text-sm">Cart Empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-yellow-400 font-bold hover:underline"
                  >
                    RETURN TO ARMORY
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-4 glass rounded-2xl border border-white/5 group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold font-orbitron text-sm group-hover:text-yellow-400 transition-colors">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-yellow-400 font-black text-sm mt-1">${item.product.price}</p>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-gray-400"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-orbitron font-bold text-xs w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-gray-400"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 md:p-8 border-t border-white/10 bg-black/40 backdrop-blur-xl space-y-4 md:space-y-6">
                <div className="flex justify-between items-center text-lg font-bold font-orbitron">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] md:text-xs">Total Credits</span>
                  <span className="text-xl md:text-2xl font-black text-yellow-400">${totalPrice.toFixed(2)}</span>
                </div>
                
                <button className="w-full group relative py-4 md:py-5 bg-yellow-400 text-black font-black font-orbitron rounded-2xl overflow-hidden flex items-center justify-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-95 text-sm md:text-base">
                  <span className="relative z-10">INITIALIZE CHECKOUT</span>
                  <CreditCard size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
                
                <p className="text-[10px] text-gray-500 text-center uppercase tracking-[0.2em] font-bold">
                  Secure Encrypted Transaction via Nexus Link
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
