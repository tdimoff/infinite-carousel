import { fetchImages } from "../api/images";
import { useEffect, useState } from "react";
import InfiniteCarousel from "./InfiniteCarousel/InfiniteCarousel";
import { IImage } from "../interfaces/IImage.interface";

const InfiniteCarouselWrapper = () => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImages({ limit: 12 });

      setImages([...data, ...data]);
    };

    fetchData();
  }, []);

  return <InfiniteCarousel images={images} spacing={8} imageWidth={500} />;
};

export default InfiniteCarouselWrapper;
