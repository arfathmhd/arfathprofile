import React, { useState } from 'react';
import { FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Photo } from '../data/data';

interface ProjectDetailProps {
  project: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle browser back button to close the detail view
  React.useEffect(() => {
    if (isOpen) {
      window.history.pushState({ projectDetail: true }, '');
      
      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const projectImages = project.images || [project.url];

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
          {/* Carousel Images */}
          {projectImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${project.alt} ${idx + 1}`}
              className={`absolute w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
            />
          ))}

          {/* Navigation Controls */}
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
        {/* Drawer Trigger */}
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
          <div className="space-y-12">
            <div>
              <p className="font-['Dot_Matrix'] text-[10px] text-zinc-400 uppercase tracking-[0.4em] mb-6">Overview</p>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                {project.description || 'Modern digital experience focusing on technical excellence and immersive design.'}
              </p>
            </div>

            {project.specs && (
              <div>
                <p className="font-['Dot_Matrix'] text-[10px] text-zinc-400 uppercase tracking-[0.4em] mb-6">Technical Specs</p>
                <div className="grid grid-cols-1 gap-4">
                  {project.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 group-hover:bg-black transition-colors" />
                      <span className="font-['Dot_Matrix'] text-xs text-zinc-700 uppercase tracking-widest">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-12">
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
              <button
                onClick={() => window.open(project.projectUrl || '#', '_blank')}
                className="w-full bg-black text-white py-5 rounded-xl font-['Dot_Matrix'] text-xs uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                Launch Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[105] animate-in fade-in duration-500"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};
