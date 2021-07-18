import { useRef, useState, useEffect } from 'react';

export const useHeightMultiplier = (watchImage: string) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [heightMultiplier, setHeightMultiplier] = useState<string | null>(null);

  // Recalculates heightMultiplier on ref change.
  useEffect(() => {
    if (imageRef.current?.height && imageRef.current?.width) {
      const heightMultiplier = calcHeightMultiplier()?.toFixed(2);
      if (heightMultiplier) setHeightMultiplier(heightMultiplier);
    } else {
      setHeightMultiplier(null);
    }
  }, [setHeightMultiplier, watchImage]);

  // Spec specifies actual width / actual height.
  // This gives an incorrect 1.25 multiplier for the example.
  // Went opposite to match th API, height/width. This is easily flippable once clarified.
  const calcHeightMultiplier = () => {
    if (imageRef.current)
      return imageRef.current?.height / imageRef.current?.width;
    return null;
  };

  return { imageRef, heightMultiplier };
};
