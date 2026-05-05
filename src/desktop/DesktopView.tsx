import { useState, useEffect, Fragment } from 'react';
import { MasonryGrid } from '../components/MasonryGrid';
import { FiInfo, FiUser, FiFileText, FiMessageCircle, FiX, FiLinkedin, FiInstagram, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const iconMap = {
  info: FiInfo,
  contact: FiUser,
  resume: FiFileText,
  message: FiMessageCircle
};

interface ActionItem {
  id: keyof typeof iconMap;
  tx: string;
  ty: string;
  ix: number;
}

export function DesktopView() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 1.5;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle background scroll lock for modals
  useEffect(() => {
    if (isModalOpen || isProfileExpanded || isProjectDetailOpen || isSocialExpanded || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isProfileExpanded, isProjectDetailOpen, isSocialExpanded, isMenuOpen]);

  // Set default cursor text for hero section
  useEffect(() => {
    if (scrollProgress < 0.1) {
      if (!cursorText || cursorText === 'EXPLORE') {
        // Only set SCROLL if we aren't already hovering a project in a way that would override it
        // But since we are at top, we won't be over a project image usually
        setCursorText('SCROLL');
      }
    } else if (scrollProgress > 0.1 && cursorText === 'SCROLL') {
      setCursorText('');
    }
  }, [scrollProgress, cursorText]);


  const iconProgress = Math.min(scrollProgress * 2, 1);
  const nameProgress = Math.max(0, (scrollProgress - 0.5) * 2);

  const actionItems: ActionItem[] = [
    { id: 'info', tx: 'clamp(2rem, 4vw, 4rem)', ty: 'clamp(3rem, 6vh, 6rem)', ix: -96 },
    { id: 'contact', tx: 'calc(100% - clamp(2rem, 4vw, 4rem))', ty: 'clamp(3rem, 6vh, 6rem)', ix: -32 },
    { id: 'resume', tx: 'clamp(2rem, 4vw, 4rem)', ty: 'calc(100% - clamp(3rem, 6vh, 6rem))', ix: 32 },
    { id: 'message', tx: 'calc(100% - clamp(2rem, 4vw, 4rem))', ty: 'calc(100% - clamp(3rem, 6vh, 6rem))', ix: 96 }
  ];

  const socialItems = [
    { id: 'li', label: 'LINKEDIN', icon: FiLinkedin, url: 'https://www.linkedin.com/in/muhammed-arfath-98a8b9262/' },
    { id: 'ig', label: 'INSTAGRAM', icon: FiInstagram, url: 'https://www.instagram.com/ar__f4th/' },
    { id: 'wa', label: 'WHATSAPP', icon: FaWhatsapp, url: 'https://wa.me/917907224281' }
  ];

  // Dynamic dimensions for expanded profile
  const profileWidth = 'clamp(600px, 85vw, 1000px)';
  const profileHeight = 'clamp(400px, 80vh, 650px)';

  return (
    <div className={`relative w-full min-h-screen bg-black overflow-x-hidden ${cursorText ? 'cursor-none' : ''}`}>

      {/* Custom Cursor Follower */}
      <div 
        className={`fixed pointer-events-none z-[999] flex items-center justify-center transition-opacity duration-300 ${cursorText && !isProjectDetailOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top'
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Rotating outer ring */}
          <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" />
          
          {/* Pulse effect */}
          <div className="absolute w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 scale-100" />
          
          {/* Cursor Text */}
          <span className="relative font-['Dot_Matrix'] text-white text-[9px] uppercase tracking-[0.4em] whitespace-nowrap drop-shadow-lg">
            {cursorText}
          </span>
        </div>
      </div>

      <main>
        {/* Animated Name */}
        <div
          className="fixed z-[110] flex flex-col items-center pointer-events-none"
          style={{
            top: `calc(50% + (clamp(2rem, 5vh, 4rem) - 50%) * ${nameProgress})`,
            left: `calc(50% + (clamp(1.5rem, 3vw, 3rem) - 50%) * ${nameProgress})`,
            transform: `translate(calc(-50% + 50% * ${nameProgress}), calc(-50% + 50% * ${nameProgress}))`,
            opacity: isProjectDetailOpen ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <h1
            className={`font-['Dot_Matrix'] uppercase leading-none ${isProjectDetailOpen ? 'text-black' : 'text-white'} whitespace-nowrap tracking-widest transition-colors duration-500`}
            style={{
              fontSize: `calc(clamp(3rem, 7vw, 8rem) + (clamp(1.25rem, 2.5vw, 2.5rem) - clamp(3rem, 7vw, 8rem)) * ${nameProgress})`
            }}
          >
            Muhammed Arfath
          </h1>
        </div>

        {/* Unified Action Menu (The Single Arrow) */}
        {!isProjectDetailOpen && (
          <div 
            className={`fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center transition-[transform,opacity] duration-700 ease-out will-change-[transform,opacity]
              ${scrollProgress > 0.1 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-5 pointer-events-none'}`}
          >
            {/* The Trigger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white text-black w-12 h-40 rounded-r-[2rem] flex flex-col items-center justify-center shadow-[10px_0_30px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-95 border-r border-t border-b border-white/50"
            >
              <div className={`transition-transform duration-500 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isMenuOpen ? <FiX size={24} /> : <FiChevronRight size={24} className="animate-pulse" />}
              </div>
              <span className="[writing-mode:vertical-lr] rotate-180 uppercase font-['Dot_Matrix'] text-[10px] tracking-[0.3em] mt-6 font-bold opacity-70">
                {isMenuOpen ? 'CLOSE' : 'ACTIONS'}
              </span>
            </button>

            {/* The Menu Panel */}
            <div 
              className={`ml-4 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 shadow-[20px_0_50px_rgba(0,0,0,0.3)] flex flex-col p-2 gap-3 border border-white/20
                ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
            >
              {actionItems.map(item => {
                const Icon = iconMap[item.id];
                const labels = { info: 'Profile', contact: 'Connect', resume: 'Resume', message: 'Contact' };
                return (
                  <button 
                    key={item.id}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.id === 'info') setIsProfileExpanded(true);
                      if (item.id === 'contact') setIsSocialExpanded(true);
                      if (item.id === 'resume') window.open('/resume.pdf', '_blank');
                      if (item.id === 'message') setIsModalOpen(true);
                    }}
                    className="w-14 h-14 flex flex-col items-center justify-center bg-black/5 rounded-xl text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-90 group/item"
                  >
                    <Icon size={20} className="mb-1" />
                    <span className="text-[7px] uppercase font-bold tracking-tighter opacity-60 group-hover/item:opacity-100">{labels[item.id]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Profile Overlay - Unified Standalone Modal */}
        {isProfileExpanded && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-700"
              onClick={() => setIsProfileExpanded(false)}
            />
            <div className="relative w-full max-w-4xl h-[70vh] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-20 duration-700 flex flex-row">
              <button 
                onClick={() => setIsProfileExpanded(false)}
                className="absolute top-6 right-6 z-50 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
              >
                <FiX size={24} />
              </button>

              {/* Photo Area */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <img src="https://res.cloudinary.com/djwvgejge/image/upload/v1769756425/FA4E5312-5C79-47D2-BB5B-E5A2D138F3ED_tpprqa.png" className="w-full h-full object-cover object-top" alt="Profile" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-left">
                  <p className="text-white/60 text-xs uppercase tracking-[0.4em] font-['Dot_Matrix'] mb-2">
                    Software Engineer
                  </p>
                  <h2 className="text-white text-5xl font-['Dot_Matrix'] uppercase tracking-widest">Arfath</h2>
                </div>
              </div>

              {/* Description Area */}
              <div className="flex-1 bg-white p-16 flex flex-col justify-center text-left overflow-y-auto">
                <h3 className="font-['Dot_Matrix'] text-black text-2xl uppercase tracking-[0.3em] mb-8 border-b border-black/5 pb-4">Professional Profile</h3>
                <p className="font-sans text-zinc-600 text-lg leading-relaxed mb-10">
                  I am a Software Engineer dedicated to building robust and scalable digital solutions. I bridge the gap between technical complexity and high-performance engineering, focusing on stability, efficiency, and future-proof architecture.
                </p>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="font-['Dot_Matrix'] text-zinc-400 text-[10px] uppercase tracking-[0.3em] mb-3">Focus</p>
                    <p className="text-zinc-800 text-sm uppercase tracking-wider font-bold">Full-stack & Architecture</p>
                  </div>
                  <div>
                    <p className="font-['Dot_Matrix'] text-zinc-400 text-[10px] uppercase tracking-[0.3em] mb-3">Location</p>
                    <p className="text-zinc-800 text-sm uppercase tracking-wider font-bold">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Overlay - Unified Modal */}
        {isSocialExpanded && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
              onClick={() => setIsSocialExpanded(false)}
            />
            <div className="relative bg-white rounded-[2rem] p-10 shadow-2xl flex items-center gap-12 animate-in zoom-in-95 duration-300 text-black">
              {socialItems.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.id}
                    onClick={() => {
                      window.open(social.url, '_blank');
                      setIsSocialExpanded(false);
                    }}
                    className="flex flex-col items-center gap-4 group/social"
                  >
                    <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center group-hover/social:bg-black group-hover/social:text-white transition-all duration-300">
                      <Icon size={32} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-['Dot_Matrix']">{social.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {isModalOpen && (
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 cursor-default"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer">
                <FiX size={24} />
              </button>
              <h3 className="text-2xl font-['Dot_Matrix'] text-white uppercase tracking-widest mb-2">Get in touch</h3>
              <p className="text-white/40 text-sm mb-8">Send me a message and I'll get back to you soon.</p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white" placeholder="Name" />
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white" placeholder="Email" />
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white resize-none" placeholder="Message" />
                <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg">Send Message</button>
              </form>
            </div>
          </div>
        )}

        {/* Hero Section Background */}
        <div className="fixed top-0 left-0 w-full h-screen bg-black z-0 flex flex-col items-center justify-center">
          <div className="absolute top-[calc(50%+clamp(8rem,15vh,12rem))] flex flex-col items-center text-center px-4 w-full z-20" style={{ opacity: 1 - nameProgress }}>
            <h2 className="text-white/90 tracking-[0.4em] uppercase text-sm md:text-xl lg:text-2xl font-medium mb-6">Software Engineer</h2>
            <p className="text-white/60 font-sans text-sm md:text-lg lg:text-xl max-w-4xl font-light leading-relaxed px-4 md:px-0">
              Building robust, scalable digital solutions with a focus on technical excellence and high-performance architecture. I specialize in bridging complex engineering challenges with seamless user experiences across the full stack, ensuring every line of code contributes to a stable and future-proof digital ecosystem.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 mt-[150vh] bg-black">
          <MasonryGrid 
            onDetailOpenChange={setIsProjectDetailOpen} 
            onProjectHover={(text) => setCursorText(text)}
          />
        </div>

        {/* Profile Overlay - Background Click to Close (For Unified Model) */}
        {isProfileExpanded && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] transition-opacity duration-700 animate-in fade-in"
            onClick={() => setIsProfileExpanded(false)}
          />
        )}
      </main>
    </div>
  );
}