
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from '../components/Hero3D';
import { PRODUCTS } from '../constants';
import { ShoppingCart, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const dropsSectionRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for various elements
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const floatOrb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatOrb2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Smooth scroll target
  const scrollToDrops = () => {
    dropsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // GSAP Parallax for the Legendary Drops header
    if (parallaxTextRef.current) {
      gsap.to(parallaxTextRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxTextRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // GSAP reveal for featured product cards
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current.children,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505]">
      {/* Background Parallax Orbs */}
      <motion.div
        style={{ y: floatOrb1Y }}
        className="fixed top-[20%] right-[10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"
      />
      <motion.div
        style={{ y: floatOrb2Y }}
        className="fixed bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-6xl md:text-9xl font-black font-orbitron tracking-tighter leading-none">
              GEAR UP FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-blue-500 neon-gold">ASCENSION</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto uppercase tracking-widest">
              Step into the digital universe where elite gamers, creators, and innovators converge.
            </p>
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
              <button
                onClick={() => navigate('/products')}
                className="group relative w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-yellow-400 text-black font-black font-orbitron rounded-full overflow-hidden transition-transform hover:scale-110 active:scale-95 text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">ENTER THE ARENA <ArrowRight size={20} /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                onClick={scrollToDrops}
                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 glass border-white/20 text-white font-black font-orbitron rounded-full hover:bg-white/10 transition-all text-sm md:text-base"
              >
                EXPLORE REALMS
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Background Text with Parallax */}
        <motion.div
          style={{ y: bgTextY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black opacity-[0.03] pointer-events-none select-none font-orbitron leading-none"
        >
          PORTAL
        </motion.div>
      </section>

      {/* Portal Gates Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase tracking-tighter italic">Portal Gates</h2>
            <div className="h-1.5 w-32 bg-yellow-400" />
          </motion.div>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-sm text-left md:text-right italic text-base md:text-xl font-light"
          >
            "Choose your path in the digital universe. Each gate leads to a realm of power."
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "THE ARSENAL", path: "/products", icon: "⚔️", desc: "Forge your weapons in the ultimate armory." },
            { title: "THE ARMORY", path: "/merchandise", icon: "🛡️", desc: "Equip yourself with legendary artifacts." },
            { title: "BATTLE ARENA", path: "/events", icon: "⚡", desc: "Enter the arena and prove your worth." },
            { title: "THE GRID", path: "/community", icon: "🌐", desc: "Connect with fellow elites across the grid." },
            { title: "CONTROL ROOM", path: "/admin", icon: "🎛️", desc: "Access the command center." },
            { title: "ORIGIN STORY", path: "/about", icon: "📖", desc: "Discover the genesis of Nexus Elite." },
          ].map((gate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-6 md:p-8 rounded-[25px] md:rounded-[40px] border border-white/10 hover:border-yellow-400/50 transition-all duration-500 cursor-pointer group"
              onClick={() => navigate(gate.path)}
            >
              <div className="text-4xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">{gate.icon}</div>
              <h3 className="text-xl md:text-2xl font-black font-orbitron mb-2 italic">{gate.title}</h3>
              <p className="text-gray-400 text-sm md:text-base font-medium">{gate.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-xs">
                ENTER GATE <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products with Deep Scroll Effects */}
      <section ref={dropsSectionRef} className="py-16 md:py-32 bg-[#080808] relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div ref={parallaxTextRef} className="mb-16 md:mb-32 text-center relative z-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-orbitron mb-2 md:mb-4 italic tracking-tighter">
              DIGITAL <span className="text-yellow-400">REALMS</span>
            </h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.8em] text-[10px] md:text-sm font-bold">Featured portals and elite equipment</p>
          </div>

          <div ref={featuredRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 relative z-20">
            {PRODUCTS.filter(p => p.isFeatured).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass group rounded-[30px] md:rounded-[50px] overflow-hidden p-4 md:p-6 relative border border-white/10 shadow-2xl"
              >
                <div className="aspect-square rounded-[20px] md:rounded-[35px] overflow-hidden relative mb-4 md:mb-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 backdrop-blur-[2px]">
                    <button className="w-full py-5 bg-yellow-400 text-black font-black font-orbitron rounded-2xl flex items-center justify-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      QUICK ADD <ShoppingCart size={22} />
                    </button>
                  </div>
                </div>
                <div className="px-2 md:px-4 pb-2 md:pb-4">
                  <div className="flex justify-between items-start mb-2 md:mb-4">
                    <h3 className="text-xl md:text-3xl font-black font-orbitron group-hover:text-yellow-400 transition-colors tracking-tighter leading-none">{product.name}</h3>
                    <div className="text-right">
                      <span className="text-yellow-400 font-black text-lg md:text-2xl">${product.price}</span>
                      <span className="block text-[8px] md:text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Limited Ed.</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed opacity-80">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative background stripes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-yellow-400/5 to-transparent pointer-events-none" />
      </section>

      {/* Parallax Quote Section - Interactive Background */}
      <section className="h-[60vh] md:h-[80vh] flex items-center justify-center relative overflow-hidden z-10">
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center grayscale opacity-10"
        />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-black font-orbitron italic leading-tight tracking-tighter">
              "BEYOND THE PORTAL LIES A UNIVERSE OF ENDLESS POSSIBILITIES.<br />
              WHERE ELITES BECOME <span className="text-yellow-400 underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">LEGENDARY</span>."
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 w-48 bg-yellow-400 mx-auto mt-12"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
// Rename for new structure
// The Portal
