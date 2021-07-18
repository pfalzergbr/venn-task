import { useRef, useState, useEffect } from 'react';

export const useHeightMultiplier = (watchImage: string) => {
  //Stores a ref of the current image
  const imageRef = useRef<HTMLImageElement | null>(null);
  // Tracking if the image url exists and connects.
  // Controls switching broken images off.
  const [isImage, setIsImage] = useState(true);
  const [heightMultiplier, setHeightMultiplier] = useState<
    number | null | undefined
  >(null);

  const onImageError = () => {
    setIsImage(false);
    setHeightMultiplier(null);
  };
  // Recalculates heightMultiplier on ref change.
  // Clears setIsImage, checks if width and height exists.
  useEffect(() => {
    setIsImage(true);
    if (imageRef.current?.height && imageRef.current?.width) {
      const heightMultiplier = calcHeightMultiplier()?.toFixed(2);
      if (heightMultiplier)
        setHeightMultiplier(state => {
          if (parseFloat(heightMultiplier) !== state)
            return parseFloat(heightMultiplier);
        });
    } else {
      setHeightMultiplier(null);
    }
  }, [setHeightMultiplier, watchImage, imageRef]);

  // Spec specifies actual width / actual height.
  // This gives an incorrect 1.25 multiplier for the example.
  // Went opposite to match th API, height/width. This is easily flippable once clarified.
  const calcHeightMultiplier = () => {
    if (imageRef.current)
      return imageRef.current?.height / imageRef.current?.width;
    return null;
  };

  return { imageRef, heightMultiplier, onImageError, isImage };
};

// && imageRef.current?.width
