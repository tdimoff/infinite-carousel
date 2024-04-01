import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./InfiniteCarousel.module.scss";
import CarouselItem from "../CarouselItem/CarouselItem";
import { IImage } from "../../interfaces/IImage.interface";

interface IInifiniteCarouselProps {
  images: IImage[];
  spacing: number;
  imageWidth: number;
}

const InifiniteCarousel = ({
  images,
  spacing,
  imageWidth,
}: IInifiniteCarouselProps) => {
  const { contentRef, handleScroll } = useInfiniteScroll({
    spacing,
    imageWidth,
    imageCount: images.length,
  });

  return (
    <div className={styles.carousel}>
      <ul
        className={styles["carousel-container"]}
        ref={contentRef}
        onWheel={handleScroll}
        onTouchStart={handleScroll}
        onTouchMove={handleScroll}
      >
        {images.map((image: IImage, i) => (
          <CarouselItem key={`${image.id}-${i}`} image={image} />
        ))}
      </ul>
    </div>
  );
};

export default InifiniteCarousel;
