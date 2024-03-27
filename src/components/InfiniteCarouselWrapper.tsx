import { useEffect, useState } from "react";
import { IImage } from "../interfaces/IImage.interface";
import { fetchImages } from "../api/images";
import InfiniteCarousel from "./InfiniteCarousel/InfiniteCarousel";

const ImageCarouselWrapper = () => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const params = { limit: 10, offset: 0 };
    const fetchImagesAsync = async () => {
      const imageData = await fetchImages(params);

      setImages(imageData);
    };

    fetchImagesAsync();
  }, []);

  return (
    <InfiniteCarousel
      images={images}
      visibleImageCount={10}
      imageWidth={500}
      spacing={8}
    />
  );
};

export default ImageCarouselWrapper;
