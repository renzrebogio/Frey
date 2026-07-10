import { useState, useEffect } from 'react';

// Use Vite's glob import to get all frame paths
const frameModules = import.meta.glob('../uploads/freyheroframes/*.jpg', { eager: true });
// Guarantee strict alphabetical sorting of keys
const frameUrls = Object.keys(frameModules).sort().map((key) => frameModules[key].default);

export function useHeroFrames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = frameUrls.length;
    const loadedImages = new Array(totalFrames);

    if (totalFrames === 0) {
      setIsLoaded(true);
      return;
    }

    frameUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        loadedImages[index] = img;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame: ${url}`);
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
    });
  }, []);

  return { isLoaded, images };
}
