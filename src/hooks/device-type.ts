import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const [device, setDeviceType] = useState<
    "Mobile" | "Desktop" | "Tablet" | null
  >(null);

  const [dimension, setDimension] = useState<{
    height: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width-640px)").matches) {
        setDeviceType("Mobile");
      } else if (window.matchMedia("(min-width: 641px) and (max-width: 1024)").matches) {
        setDeviceType("Tablet");
      } else {
        setDeviceType("Desktop");
      }
      setDimension({width: window.innerWidth, height: window.innerHeight});
    };

    //Initial detection
    checkDevice();

    //Listner for windows resize
    window.addEventListener('resize', checkDevice);

    //cleanup listner
    return () => {
        window.removeEventListener('resize',checkDevice);
    }
  }, []);

  return{
    device,
    width: dimension?.width,
    height: dimension?.height,
    isMobile: device === 'Mobile',
    isTablet: device === 'Tablet',
    isDesktop: device === 'Desktop'
  }
};
