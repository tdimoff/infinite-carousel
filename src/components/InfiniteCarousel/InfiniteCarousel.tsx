import { useEffect, useState } from "react";
import { IImage } from "../../interfaces/IImage.interface";
import styles from "./InfiniteCarousel.module.scss";
import CarouselItem from "../CarouselItem/CarouselItem";
import useCarouselScroll from "../../hooks/useCarouselScroll";

interface IInfiniteCarouselProps {
  images: IImage[];
  imageWidth: number;
  visibleImageCount: number;
}

const InfiniteCarousel = ({ images, imageWidth, visibleImageCount }: IInfiniteCarouselProps) => {
  const [contentWidth, setContentWidth] = useState(0);
  const { contentRef, visibleMinIndex, handleScroll } = useCarouselScroll({
    contentWidth,
    imageWidth,
    imagesLength: images.length,
  });

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.getBoundingClientRect().width);
    }
  }, [contentRef, images]);

  const imagesToListElements = (prefix = "") => {
    return images?.map((image: IImage, index) => (
      <CarouselItem
        key={`${prefix}_${image.id}`}
        image={image}
        isVisible={index <= visibleMinIndex + visibleImageCount}
      />
    ));
  };

  return (
    <div className={styles.carousel}>
      <ul
        ref={contentRef}
        className={styles.carousel__content}
        onTouchStart={handleScroll}
        onTouchMove={handleScroll}
        onWheel={handleScroll}
      >
        {imagesToListElements()}
        {imagesToListElements("clone")}
      </ul>
    </div>
  );
};

export default InfiniteCarousel;
