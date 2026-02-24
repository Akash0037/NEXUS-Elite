
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Target, Cpu, Users, Globe, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline Line Animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 90%",
          scrub: 1,
        }
      });

      // Staggered reveal for timeline items
      gsap.utils.toArray(".timeline-item").forEach((item: any) => {
        gsap.from(item, {
          opacity: 0,
          x: item.classList.contains('left') ? -100 : 100,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        });
      });

      // Stats counter animation
      gsap.utils.toArray(".stat-value").forEach((stat: any) => {
        const val = parseInt(stat.innerText);
        gsap.from(stat, {
          innerText: 0,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: "2021", title: "THE SPARK", desc: "Nexus Elite was founded in a small underground lab in Neo Tokyo, born from the need for lag-free hardware." },
    { year: "2022", title: "X-1 PROTOTYPE", desc: "The legendary X-1 controller enters beta, smashing performance records across the e-sports circuit." },
    { year: "2023", title: "GLOBAL SYNC", desc: "We launched the Nexus Network, connecting 5 million players with dedicated low-latency nodes." },
    { year: "2024", title: "ASCENSION", desc: "Expansion into tactical streetwear and workstation-grade PCs for the next generation of creators." },
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="text-center z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] font-black font-orbitron italic leading-none tracking-tighter"
          >
            ORIGIN <span className="text-yellow-400">STORY</span>
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-2 bg-yellow-400 mx-auto my-8 shadow-[0_0_20px_#facc15]"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-400 text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.2em] md:tracking-[0.5em] font-light max-w-4xl mx-auto px-4"
          >
            From the digital void, Nexus Elite emerged—a vision to unite gamers, creators, and pioneers. Our journey is etched in code, innovation, and relentless pursuit of transcendence.
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-yellow-400 opacity-50"
        >
          <ChevronDown size={48} />
        </motion.div>

        {/* Background Visuals */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-400/5 rounded-full blur-[200px] animate-pulse" />
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 grayscale" />
        </div>
      </section>

      {/* Vision, Mission, Founder Story */}
      <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Zap size={40} />, title: "VISION", color: "text-yellow-400", text: "To forge a digital universe where every gamer, creator, and innovator thrives in synergy." },
            { icon: <Shield size={40} />, title: "MISSION", color: "text-blue-400", text: "Empower the elite with tools, knowledge, and community to transcend the ordinary." },
            { icon: <Target size={40} />, title: "FOUNDER'S CODE", color: "text-white", text: "Akash: 'Every pixel, every circuit, every story—built for those who dare to ascend.'" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className="glass p-8 md:p-12 rounded-[30px] md:rounded-[50px] border border-white/5 relative group"
            >
              <div className={`mb-6 md:mb-8 ${item.color} group-hover:scale-125 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-xl md:text-3xl font-black font-orbitron mb-3 md:mb-4 italic">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{item.text}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 md:py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          {[
            { label: "PLAYERS SYNCED", value: "15", suffix: "M" },
            { label: "FRAMES/SEC AVG", value: "240", suffix: "+" },
            { label: "NODES DEPLOYED", value: "142", suffix: "" },
            { label: "WIN RATE BOOST", value: "34", suffix: "%" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-orbitron text-white mb-1 md:mb-2 italic">
                <span className="stat-value">{stat.value}</span>{stat.suffix}
              </div>
              <div className="text-gray-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Timeline: The Chronicle */}
      <section ref={timelineRef} className="py-20 md:py-40 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 -translate-x-1/2 timeline-line hidden md:block" />

          <div className="space-y-16 md:space-y-32">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`timeline-item relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse left' : 'right'}`}
              >
                {/* Desktop Year Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-black border-4 border-yellow-400 rounded-full z-20 hidden md:flex items-center justify-center font-black font-orbitron text-xs shadow-[0_0_15px_#facc15]">
                  {m.year}
                </div>
                <div className="flex-1 w-full">
                  <div className="glass p-6 md:p-10 rounded-[25px] md:rounded-[40px] border border-white/10 hover:border-yellow-400/50 transition-all duration-500">
                    <span className="md:hidden block text-yellow-400 font-black font-orbitron mb-2 md:mb-4">{m.year}</span>
                    <h4 className="text-xl md:text-3xl font-black font-orbitron mb-2 md:mb-4 italic tracking-tighter">{m.title}</h4>
                    <p className="text-gray-400 leading-relaxed font-medium">{m.desc}</p>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware DNA DNA Visual */}
      <section className="py-20 md:py-40 relative bg-black">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1635492491273-455af7728453?q=80&w=2000&auto=format&fit=crop')] bg-fixed" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <motion.div 
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             viewport={{ once: true }}
             className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black mb-12 shadow-[0_0_50px_rgba(250,204,21,0.4)]"
          >
            <Cpu size={48} />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-black font-orbitron italic mb-4 md:mb-8 tracking-tighter">OUR HARDWARE DNA</h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl font-light leading-relaxed mb-10 md:mb-16 px-4">
            We don't just assemble parts. We fuse technology with the human soul. Every PCB, every switch, every thread is tested for maximum combat efficiency.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
             <div className="p-8 border border-white/5 rounded-3xl backdrop-blur-md">
                <Globe className="text-blue-400 mx-auto mb-4" />
                <div className="font-bold text-xs uppercase tracking-widest">Global Ops</div>
             </div>
             <div className="p-8 border border-white/5 rounded-3xl backdrop-blur-md">
                <Users className="text-yellow-400 mx-auto mb-4" />
                <div className="font-bold text-xs uppercase tracking-widest">User Focused</div>
             </div>
             <div className="p-8 border border-white/5 rounded-3xl backdrop-blur-md">
                <Zap className="text-white mx-auto mb-4" />
                <div className="font-bold text-xs uppercase tracking-widest">Ultra Fast</div>
             </div>
             <div className="p-8 border border-white/5 rounded-3xl backdrop-blur-md">
                <Cpu className="text-green-400 mx-auto mb-4" />
                <div className="font-bold text-xs uppercase tracking-widest">Custom Silicon</div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-40 text-center relative">
         <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-5xl font-black font-orbitron italic mb-6 md:mb-8">ARE YOU READY TO <span className="text-yellow-400">ASCEND</span>?</h2>
            <button 
              onClick={() => window.location.hash = '#/products'}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black font-black font-orbitron rounded-full hover:bg-yellow-400 hover:scale-110 transition-all shadow-2xl active:scale-95 text-sm md:text-base"
            >
              ENTER THE ARMORY
            </button>
         </div>
      </section>
    </div>
  );
};

export default About;
// Rename for new structure
// Origin Story
