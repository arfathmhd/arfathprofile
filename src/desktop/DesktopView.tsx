import { useState, useEffect, Fragment } from 'react';
import { Header } from '../components/Header';
import { MasonryGrid } from '../components/MasonryGrid';
import { FiInfo, FiUser, FiFileText, FiMessageCircle, FiX } from 'react-icons/fi';

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
    if (isModalOpen || isProfileExpanded || isProjectDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isProfileExpanded, isProjectDetailOpen]);

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
    { id: 'li', label: 'LINKEDIN', icon: 'li', url: 'https://www.linkedin.com/in/muhammed-arfath-98a8b9262/' },
    { id: 'ig', label: 'INSTAGRAM', icon: 'ig', url: 'https://www.instagram.com/ar__f4th/' },
    { id: 'wa', label: 'WHATSAPP', icon: 'wa', url: 'https://wa.me/917907224281' }
  ];

  // Dynamic dimensions for expanded profile
  const profileWidth = 'clamp(600px, 85vw, 1000px)';
  const profileHeight = 'clamp(400px, 80vh, 650px)';

  return (
    <div className={`relative w-full min-h-screen bg-black overflow-x-hidden ${cursorText ? 'cursor-none' : ''}`}>
      <Header />

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

        {/* Action Buttons & Socials (Desktop Only) */}
        {!isProjectDetailOpen && actionItems.map((item) => {
          const IconComponent = iconMap[item.id];
          const startX = `calc(50% + (${item.ix} / 1440 * 100vw))`;
          const startY = 'calc(50% - clamp(5rem, 15vh, 10rem))';
          const isInfo = item.id === 'info';
          const isContact = item.id === 'contact';
          const isResume = item.id === 'resume';
          const isMessage = item.id === 'message';

          const expansion = nameProgress;

          return (
            <Fragment key={item.id}>
              <button
                onClick={() => {
                  if (isResume) window.open('/src/assets/arfath-resume_1_w8jtez.pdf', '_blank');
                  if (isMessage && expansion > 0.5) setIsModalOpen(true);
                  if (isInfo && expansion > 0.8) setIsProfileExpanded(!isProfileExpanded);
                }}
                className={`fixed group overflow-hidden border border-white/30 border-dotted flex items-center justify-center text-white bg-white/5 transition-all duration-700 ease-out ${isMessage && expansion > 0.5 ? 'hover:bg-white hover:text-black cursor-pointer' : (isResume || isInfo || isContact) && expansion > 0.5 ? 'cursor-pointer' : 'cursor-default'}`}
                style={{
                  zIndex: (isInfo && isProfileExpanded) ? 150 : 40,
                  width: (isInfo && isProfileExpanded) ? profileWidth : (isInfo ? `calc(3rem + 80px * ${expansion})` : isContact ? `calc(3rem + 120px * ${expansion})` : isResume ? `calc(3rem + 60px * ${expansion})` : isMessage ? `calc(3rem + 140px * ${expansion})` : '3rem'),
                  height: (isInfo && isProfileExpanded) ? profileHeight : (isInfo ? `calc(3rem + 110px * ${expansion})` : isContact ? `calc(3rem + 100px * ${expansion})` : isResume ? `calc(3rem + 80px * ${expansion})` : isMessage ? `calc(3rem + 16px * ${expansion})` : '3rem'),
                  left: (isInfo && isProfileExpanded) ? '50%' : (isInfo || isResume ? `calc(${startX} + (${item.tx} + 60px * ${expansion} - ${startX}) * ${iconProgress})`
                    : isContact || isMessage ? `calc(${startX} + (${item.tx} - 60px * ${expansion} - ${startX}) * ${iconProgress})`
                      : `calc(${startX} + (${item.tx} - ${startX}) * ${iconProgress})`),
                  top: (isInfo && isProfileExpanded) ? '50%' : (isInfo || isContact ? `calc(${startY} + (${item.ty} + 80px * ${expansion} - ${startY}) * ${iconProgress})`
                    : (isResume || isMessage) ? `calc(${startY} + (${item.ty} - 80px * ${expansion} - ${startY}) * ${iconProgress})`
                      : `calc(${startY} + (${item.ty} - ${startY}) * ${iconProgress})`),
                  borderRadius: (isInfo || isContact || isResume || isMessage) ? `calc(9999px + (0.5rem - 9999px) * ${expansion})` : '9999px',
                  transform: `translate(-50%, -50%) rotate(${(isInfo && isProfileExpanded) ? '360deg' : '0deg'})`,
                }}
              >
                {/* Info Photo */}
                {isInfo && (
                  <div className={`absolute inset-0 w-full h-full ${isProfileExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`} style={{ opacity: expansion }}>
                    <div className={`w-full h-full transition-all duration-700 flex ${isProfileExpanded ? 'opacity-100' : 'opacity-10 group-hover:opacity-100'}`}>
                      {/* Photo Column */}
                      <div className={`${isProfileExpanded ? 'w-1/2' : 'w-full'} h-full relative transition-all duration-700 overflow-hidden`}>
                        <img src="https://res.cloudinary.com/djwvgejge/image/upload/v1769756425/FA4E5312-5C79-47D2-BB5B-E5A2D138F3ED_tpprqa.png" className="w-full h-full object-cover" alt="Profile" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-left">
                          <p className="text-white/90 text-xs uppercase tracking-widest font-['Dot_Matrix']">
                            {'Dev & Designer'}
                          </p>
                        </div>
                      </div>

                      {/* Description Column */}
                      {isProfileExpanded && (
                        <div className="w-1/2 h-full bg-white p-6 md:p-12 flex flex-col justify-center text-left animate-in fade-in slide-in-from-right duration-700 border-l border-zinc-100 overflow-y-auto relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsProfileExpanded(false);
                            }}
                            className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
                          >
                            <FiX size={24} />
                          </button>
                          <h3 className="font-['Dot_Matrix'] text-black text-2xl md:text-3xl uppercase tracking-widest mb-6">About Me</h3>
                          <p className="font-sans text-zinc-600 text-sm leading-relaxed mb-8">
                            I am a Software Engineer and Designer passionate about creating immersive digital experiences. 
                            I bridge the gap between technical complexity and beautiful interaction, focusing on performance, accessibility, and high-end aesthetics.
                          </p>
                          <div className="space-y-6">
                            <div>
                              <p className="font-['Dot_Matrix'] text-zinc-400 text-[10px] uppercase tracking-[0.3em] mb-2">Focus</p>
                              <p className="text-zinc-800 text-xs uppercase tracking-wider">Full-stack Dev & UI Architecture</p>
                            </div>
                            <div>
                              <p className="font-['Dot_Matrix'] text-zinc-400 text-[10px] uppercase tracking-[0.3em] mb-2">Expertise</p>
                              <p className="text-zinc-800 text-xs uppercase tracking-wider">React / TypeScript / Creative Coding</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Social/Contact Links */}
                {isContact && (
                  <div
                    className="absolute inset-0 w-full h-full p-2 transition-opacity duration-300"
                    style={{
                      opacity: expansion > 0.5 ? 1 : 0,
                      pointerEvents: expansion > 0.8 ? 'auto' : 'none'
                    }}
                  >
                    <div className="w-full h-full bg-white/90 rounded-sm flex flex-col justify-center p-3 shadow-inner">
                      {socialItems.map((social) => (
                        <div
                          key={social.id}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents inner click from bubbling up to the main button
                            window.open(social.url, '_blank');
                          }}
                          className="flex items-center justify-between w-full py-2 px-2 rounded hover:bg-black/5 transition-colors cursor-pointer pointer-events-auto"
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.15em] font-['Dot_Matrix'] text-black/80">{social.label}</span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.1em] font-['Dot_Matrix'] text-black/50">{social.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resume Preview */}
                {isResume && (
                  <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: expansion }}>
                    <div className="w-full h-full bg-white/10 p-2 transition-opacity duration-300 opacity-10 group-hover:opacity-100">
                      <div className="w-full h-full bg-white/90 rounded-sm flex flex-col p-3 shadow-inner">
                        <div className="w-full h-1 bg-black/10 mb-1" /><div className="w-2/3 h-1 bg-black/10 mb-3" />
                        <div className="flex-1 border-t border-black/5 pt-2 flex flex-col gap-1">
                          {[1, 2, 3].map(i => <div key={i} className={`h-[2px] bg-black/5 ${i % 2 === 0 ? 'w-full' : 'w-4/5'}`} />)}
                        </div>
                        <span className="text-[6px] text-black/40 font-bold uppercase mt-auto">Resume.pdf</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Text */}
                {isMessage && (
                  <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap overflow-hidden" style={{ opacity: expansion }}>
                    <span className="text-[12px] font-bold uppercase tracking-[0.3em] font-['Dot_Matrix']">{'Contact Us'}</span>
                  </div>
                )}

                {/* Original Icon */}
                <div style={{ opacity: expansion > 0.8 && (isInfo || isContact || isResume || isMessage) ? 0 : 1 }}>
                  <IconComponent size={20} />
                </div>
              </button>
            </Fragment>
          );
        })}

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
            <h2 className="text-white/90 tracking-[0.4em] uppercase text-sm md:text-xl lg:text-2xl font-medium mb-6">Software Engineer & Designer</h2>
            <p className="text-white/60 font-sans text-sm md:text-lg lg:text-xl max-w-3xl font-light leading-relaxed px-4 md:px-0">
              Crafting immersive digital experiences and bringing bold ideas to life through code, aesthetics, and interaction.
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

        {/* Profile Overlay - Background Click to Close */}
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