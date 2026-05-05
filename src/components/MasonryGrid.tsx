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
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Explicitly group photos to ensure they are rendered separately and in order
  const dynamicPhotos = photos.filter(photo => photo.category === 'dynamic');
  const staticPhotos = photos.filter(photo => photo.category === 'static');
  const allPhotos = [...dynamicPhotos, ...staticPhotos];


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


  return (
    <div ref={containerRef} className="w-full bg-black min-h-screen">
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

