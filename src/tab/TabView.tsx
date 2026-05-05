import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { MasonryGrid } from '../components/MasonryGrid';
import { FiInfo, FiUser, FiFileText, FiMessageCircle, FiX, FiLinkedin, FiInstagram, FiChevronUp, FiChevronDown } from 'react-icons/fi';
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

export function TabView() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setCursorText] = useState('');

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

  const nameProgress = Math.max(0, (scrollProgress - 0.5) * 2);

  const actionItems: ActionItem[] = [
    { id: 'info', tx: '0%', ty: '30%', ix: -80 },
    { id: 'contact', tx: '100%', ty: '30%', ix: -20 },
    { id: 'resume', tx: '0%', ty: '70%', ix: 20 },
    { id: 'message', tx: '100%', ty: '70%', ix: 80 }
  ];

  const socialItems = [
    { id: 'li', label: 'LINKEDIN', icon: FiLinkedin, url: 'https://www.linkedin.com/in/muhammed-arfath-98a8b9262/' },
    { id: 'ig', label: 'INSTAGRAM', icon: FiInstagram, url: 'https://www.instagram.com/ar__f4th/' },
    { id: 'wa', label: 'WHATSAPP', icon: FaWhatsapp, url: 'https://wa.me/917907224281' }
  ];


  return (
    <div className={`relative w-full min-h-screen bg-black overflow-x-hidden`}>
      <Header />

      <main>
        {/* Animated Name */}
        <div
          className="fixed z-[110] flex flex-col items-center pointer-events-none w-full px-4 text-center"
          style={{
            top: `calc(50% + (clamp(1.5rem, 4vh, 2rem) - 50%) * ${nameProgress})`,
            left: '50%',
            transform: `translate(-50%, -50%)`,
            opacity: isProjectDetailOpen ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <h1
            className={`font-['Dot_Matrix'] uppercase leading-none ${isProjectDetailOpen ? 'text-black' : 'text-white'} whitespace-nowrap tracking-widest transition-colors duration-500`}
            style={{
              fontSize: `calc(clamp(1.5rem, 6vw, 2.5rem) + (clamp(0.85rem, 3.5vw, 1.1rem) - clamp(1.5rem, 6vw, 2.5rem)) * ${nameProgress})`
            }}
          >
            Muhammed Arfath
          </h1>
        </div>

        {/* Action Buttons (Appearing during scroll animation) */}

        {/* Unified Action Menu (The Single Arrow) */}
        {!isProjectDetailOpen && (
          <div 
            className="fixed z-[100] flex flex-col items-center transition-all duration-700 ease-out pointer-events-none"
            style={{ 
              left: '50%',
              bottom: '0',
              opacity: scrollProgress > 0.1 ? 1 : 0,
              transform: `translate(-50%, ${scrollProgress > 0.1 ? '0' : '20px'})`,
              pointerEvents: scrollProgress > 0.1 ? 'auto' : 'none'
            }}
          >
            {/* The Menu Panel */}
            <div 
              className={`mb-4 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] flex flex-row p-2 gap-3 border border-white/20
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
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
                      if (item.id === 'resume') window.open('/src/assets/arfath-resume_1_w8jtez.pdf', '_blank');
                      if (item.id === 'message') setIsModalOpen(true);
                    }}
                    className="w-16 h-16 flex flex-col items-center justify-center bg-black/5 rounded-xl text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-90 group/item"
                  >
                    <Icon size={20} className="mb-1" />
                    <span className="text-[7px] uppercase font-bold tracking-tighter opacity-60 group-hover/item:opacity-100">{labels[item.id]}</span>
                  </button>
                );
              })}
            </div>

            {/* The Trigger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white text-black w-48 h-10 rounded-t-2xl flex items-center justify-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-95 border-l border-t border-r border-white/50"
            >
              <div className={`transition-transform duration-500 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isMenuOpen ? <FiX size={18} /> : <FiChevronUp size={18} className="animate-pulse" />}
              </div>
              <span className="uppercase font-['Dot_Matrix'] text-[10px] tracking-[0.3em] font-bold opacity-70">
                {isMenuOpen ? 'CLOSE' : 'ACTIONS'}
              </span>
            </button>
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
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300 cursor-default"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer">
                <FiX size={20} />
              </button>
              <h3 className="text-xl font-['Dot_Matrix'] text-white uppercase tracking-widest mb-2">Get in touch</h3>
              <p className="text-white/40 text-xs mb-6">Send me a message and I'll get back to you soon.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white" placeholder="Name" />
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white" placeholder="Email" />
                <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white resize-none" placeholder="Message" />
                <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 text-xs rounded-lg">Send Message</button>
              </form>
            </div>
          </div>
        )}

        {/* Hero Section Background */}
        <div className="fixed top-0 left-0 w-full h-screen bg-black z-0 flex flex-col items-center justify-center">
          <div className="absolute top-[calc(50%+clamp(5rem,10vh,8rem))] flex flex-col items-center text-center px-6 w-full z-20" style={{ opacity: 1 - nameProgress }}>
            <h2 className="text-white/90 tracking-[0.3em] uppercase text-xs font-medium mb-4">Software Engineer</h2>
            <p className="text-white/60 font-sans text-[13px] max-w-sm font-light leading-relaxed">
              Building robust, scalable digital solutions with a focus on technical excellence and high-performance architecture. I specialize in bridging complex engineering challenges with seamless user experiences across the full stack.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-700"
            style={{ opacity: 1 - (scrollProgress * 4) }}
          >
            <span className="font-['Dot_Matrix'] text-[9px] text-white/30 uppercase tracking-[0.4em]">Scroll</span>
            <div className="animate-mouse-scroll">
              <FiChevronDown className="text-white/40" size={20} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 mt-[150vh] bg-black">
          <MasonryGrid
            onDetailOpenChange={setIsProjectDetailOpen}
            onProjectHover={(text) => setCursorText(text)}
          />
        </div>

        {/* Social Overlay - Background Click to Close */}
        {isSocialExpanded && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
              onClick={() => setIsSocialExpanded(false)}
            />
            <div className="relative bg-white rounded-2xl p-4 shadow-2xl flex items-center gap-6 animate-in zoom-in-95 duration-300">
              {socialItems.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.id}
                    onClick={() => {
                      window.open(social.url, '_blank');
                      setIsSocialExpanded(false);
                    }}
                    className="flex flex-col items-center gap-2 group/social"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover/social:bg-black group-hover/social:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest">{social.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Profile Overlay - Standalone */}
        {isProfileExpanded && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-700"
              onClick={() => setIsProfileExpanded(false)}
            />
            <div className="relative w-full max-w-sm h-[80vh] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-20 duration-700 flex flex-col">
              <button 
                onClick={() => setIsProfileExpanded(false)}
                className="absolute top-6 right-6 z-50 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
              >
                <FiX size={20} />
              </button>

              {/* Photo Area */}
              <div className="h-1/2 w-full relative overflow-hidden">
                <img src="https://res.cloudinary.com/djwvgejge/image/upload/v1769756425/FA4E5312-5C79-47D2-BB5B-E5A2D138F3ED_tpprqa.png" className="w-full h-full object-cover object-top" alt="Profile" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-['Dot_Matrix'] mb-1">
                    Software Engineer
                  </p>
                  <h2 className="text-white text-2xl font-['Dot_Matrix'] uppercase tracking-widest">Arfath</h2>
                </div>
              </div>

              {/* Description Area */}
              <div className="flex-1 bg-white p-8 flex flex-col justify-start text-left overflow-y-auto">
                <h3 className="font-['Dot_Matrix'] text-black text-sm uppercase tracking-[0.3em] mb-6 border-b border-black/5 pb-2">Professional Profile</h3>
                <p className="font-sans text-zinc-600 text-[14px] leading-relaxed mb-8">
                  I am a Software Engineer dedicated to building robust and scalable digital solutions. I bridge the gap between technical complexity and high-performance engineering, focusing on stability, efficiency, and future-proof architecture.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-['Dot_Matrix'] text-zinc-400 text-[9px] uppercase tracking-[0.3em] mb-2">Focus</p>
                    <p className="text-zinc-800 text-[11px] uppercase tracking-wider font-bold">Full-stack & UI</p>
                  </div>
                  <div>
                    <p className="font-['Dot_Matrix'] text-zinc-400 text-[9px] uppercase tracking-[0.3em] mb-2">Location</p>
                    <p className="text-zinc-800 text-[11px] uppercase tracking-wider font-bold">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
