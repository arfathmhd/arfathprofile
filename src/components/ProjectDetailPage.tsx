import React, { useState } from 'react';
import { FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Photo } from '../data/data';

interface ProjectDetailPageProps {
  project: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset state when project changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
    setIsExpanded(false);
  }, [project]);

  const projectImages = project?.images || (project ? [project.url] : []);

  // Handle browser back button and background scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.history.pushState({ projectDetail: true }, '');
      
      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen, onClose]);

  // Auto-slide functionality
  React.useEffect(() => {
    if (isOpen && project && projectImages.length > 1 && !isExpanded) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      }, 2000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen, project, projectImages.length, isExpanded]);

  if (!isOpen || !project) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col">
      {/* Header - Always Visible */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-none">
        {/* Close button and category removed as requested */}
      </header>

      {/* Main Content - Image Carousel */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden group">
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            {projectImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.alt} ${idx + 1}`}
                className={`absolute w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
              />
            ))}
          </div>

          {/* Carousel Navigation */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-8 md:left-12 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/40 hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-8 md:right-12 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/40 hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
              >
                <FiChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-28 left-0 right-0 z-20 flex justify-center gap-3">
                {projectImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`h-1 transition-all duration-500 rounded-full ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Collapsible Info Drawer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-[110] ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}
      >
        {/* Drawer Trigger Header */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-20 flex items-center justify-between px-6 md:px-12 cursor-pointer border-t border-zinc-100 hover:bg-zinc-50 transition-colors"
        >
          <div className="flex flex-col">
            <h2 className="font-['Dot_Matrix'] text-lg md:text-2xl uppercase tracking-wider text-black leading-none">
              {project.title || 'Project Title'}
            </h2>
            <p className="font-['Dot_Matrix'] text-[9px] text-zinc-400 uppercase tracking-[0.3em] mt-2">
              {project.category || 'CATEGORY'}
            </p>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-500" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <FiChevronUp size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 overflow-y-auto max-h-[70vh]">
          {/* Left Column: Description & Specs */}
          <div className="space-y-12">
            <div>
              <p className="font-['Dot_Matrix'] text-[10px] text-zinc-400 uppercase tracking-[0.4em] mb-6">Overview</p>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                {project.description || 'No description available for this project. This project showcases innovative design and technical excellence in modern web development.'}
              </p>
            </div>

            {project.specs && (
              <div>
                <p className="font-['Dot_Matrix'] text-[10px] text-zinc-400 uppercase tracking-[0.4em] mb-6">Technical Specifications</p>
                <div className="flex flex-wrap gap-3">
                  {project.specs.map((spec, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2.5 bg-black rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 group"
                    >
                      <span className="font-['Dot_Matrix'] text-[10px] text-white/70 group-hover:text-white uppercase tracking-widest transition-colors">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actions & Details */}
          {/* Right Column: Actions */}
          <div className="flex flex-col justify-center items-center md:items-end h-full">
            {project.projectUrl ? (
              <button
                onClick={() => window.open(project.projectUrl, '_blank')}
                className="group relative px-12 py-6 bg-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative flex items-center gap-4">
                  <span className="font-['Dot_Matrix'] text-white text-[10px] md:text-xs uppercase tracking-[0.5em]">Live Link</span>
                  <div className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-500" />
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-4 px-10 py-5 bg-zinc-50 rounded-full border border-zinc-100">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-['Dot_Matrix'] text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.5em]">Ongoing Work</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when drawer is expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[105] transition-opacity duration-700 animate-in fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};
