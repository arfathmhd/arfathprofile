import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { DesktopView } from './desktop/DesktopView';
import { TabView } from './tab/TabView';
import { MobileView } from './mobile/MobileView';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

function App() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (device === 'mobile') {
    return <MobileView />;
  }

  if (device === 'tablet') {
    return <TabView />;
  }

  return <DesktopView />;
}

export default App;