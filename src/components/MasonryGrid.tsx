import React, { useState, useEffect, useRef } from 'react';
import { photos, type Photo } from '../data/data';
import { ProjectDetailPage } from './ProjectDetailPage';

interface MasonryGridProps {
  onDetailOpenChange?: (isOpen: boolean) => void;
  onProjectHover?: (text: string) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ onDetailOpenChange, onProjectHover }) => {
  const [selectedProject, setSelectedProject] = useState<Photo | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'static' | 'dynamic'>('dynamic');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Explicitly group photos to ensure they are rendered separately and in order
  const dynamicPhotos = photos.filter(photo => photo.category === 'dynamic');
  const staticPhotos = photos.filter(photo => photo.category === 'static');
  const allPhotos = [...dynamicPhotos, ...staticPhotos];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setIsHeaderVisible(rect.top <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active category based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px', // Trigger earlier when coming from top
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const photoId = entry.target.getAttribute('data-photo-id');
          const photo = photos.find(p => p.id === photoId);
          if (photo?.category && photo.category !== activeCategory) {
            setActiveCategory(photo.category as 'static' | 'dynamic');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // We observe each section to track which one is active
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [allPhotos, activeCategory]);

  const handleProjectClick = (photo: Photo) => {
    setSelectedProject(photo);
    setIsDetailOpen(true);
    onDetailOpenChange?.(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    onDetailOpenChange?.(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const scrollToCategory = (category: 'static' | 'dynamic') => {
    const firstPhotoOfCategory = allPhotos.find(p => p.category === category);
    if (firstPhotoOfCategory && sectionRefs.current[firstPhotoOfCategory.id]) {
      sectionRefs.current[firstPhotoOfCategory.id]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen">
      {/* Category Filter - Fixed at the top during scroll */}
      <div className={`fixed top-14 left-0 z-[70] w-full bg-black/90 backdrop-blur-xl hidden md:flex justify-center gap-12 py-6 border-b border-white/5 transition-all duration-700 ease-in-out ${isHeaderVisible && !isDetailOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        {['static', 'dynamic'].map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategory(cat as 'static' | 'dynamic')}
            className={`font-['Dot_Matrix'] text-[10px] md:text-xs uppercase tracking-[0.4em] transition-all duration-500 relative py-2 ${activeCategory === cat ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
          >
            {cat} Website
            {activeCategory === cat && (
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white animate-in fade-in slide-in-from-left duration-700" />
            )}
          </button>
        ))}
      </div>

      {/* Spacer to maintain layout flow since the header is now fixed */}
      <div className="w-full h-24 hidden md:block" />

      <div className="relative w-full grid grid-cols-2 gap-1 p-1 md:p-0 md:gap-0 md:block">
        {/* Dynamic Website Section */}
        {dynamicPhotos.map((photo) => (
          <section
            key={photo.id}
            data-photo-id={photo.id}
            ref={el => { sectionRefs.current[photo.id] = el; }}
            className="w-full aspect-square md:aspect-auto md:h-screen md:sticky md:top-0 flex flex-col justify-center items-center overflow-hidden bg-black md:border-t border-white/5"
          >
            <button
              onClick={() => handleProjectClick(photo)}
              onMouseEnter={() => onProjectHover?.('EXPLORE')}
              onMouseLeave={() => onProjectHover?.('')}
              className="w-full h-full relative group cursor-pointer overflow-hidden"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/10 transition-all duration-700" />

              <div className="absolute bottom-4 left-4 right-4 md:bottom-24 md:left-24 md:right-24 flex flex-col items-start">
                <div className="text-left max-w-4xl animate-in fade-in slide-in-from-bottom duration-1000">
                  <h3 className="font-['Dot_Matrix'] text-white text-base sm:text-xl md:text-8xl uppercase tracking-widest leading-tight md:leading-[0.8] drop-shadow-2xl">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </button>
          </section>
        ))}

        {/* Static Website Section */}
        {staticPhotos.map((photo) => (
          <section
            key={photo.id}
            data-photo-id={photo.id}
            ref={el => { sectionRefs.current[photo.id] = el; }}
            className="w-full aspect-square md:aspect-auto md:h-screen md:sticky md:top-0 flex flex-col justify-center items-center overflow-hidden bg-black md:border-t border-white/5"
          >
            <button
              onClick={() => handleProjectClick(photo)}
              onMouseEnter={() => onProjectHover?.('EXPLORE')}
              onMouseLeave={() => onProjectHover?.('')}
              className="w-full h-full relative group cursor-pointer overflow-hidden"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/10 transition-all duration-700" />

              <div className="absolute bottom-4 left-4 right-4 md:bottom-24 md:left-24 md:right-24 flex flex-col items-start">
                <div className="text-left max-w-4xl animate-in fade-in slide-in-from-bottom duration-1000">
                  <h3 className="font-['Dot_Matrix'] text-white text-base sm:text-xl md:text-8xl uppercase tracking-widest leading-tight md:leading-[0.8] drop-shadow-2xl">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </button>
          </section>
        ))}
      </div>

      <ProjectDetailPage
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

