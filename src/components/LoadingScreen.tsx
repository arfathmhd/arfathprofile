import { useState, useEffect } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        // Faster increments for a snappier feel
        const inc = Math.random() > 0.7 ? 8 : 4;
        return Math.min(prev + inc, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[1000] bg-[#f5f5f5] flex flex-col p-8 md:p-16 transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Top Left Text */}
      <div className="font-mono text-red-500 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
        Loading...
      </div>

      {/* Center/Right Percentage */}
      <div className="flex-1 flex items-center justify-end pr-4 md:pr-12">
        <div className="text-right">
          <div className="font-['Dot_Matrix'] text-[25vw] md:text-[18vw] leading-none text-zinc-800 tracking-[-0.05em] select-none">
            {progress.toString().padStart(3, '0')}%
          </div>
          <div className="font-['Dot_Matrix'] text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.3em] mt-4">
            SP • DEV
          </div>
        </div>
      </div>

      {/* Bottom Left Arrow Icon (Dot Matrix Style) */}
      <div className="mt-auto">
        <div className="font-['Dot_Matrix'] text-6xl md:text-8xl text-zinc-800 select-none">
          →
        </div>
      </div>
    </div>
  );
}
