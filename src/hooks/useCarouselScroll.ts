import { useState, useRef, TouchEvent, WheelEvent } from "react";

interface IUseCarouselScrollProps {
  contentWidth: number;
  imageWidth: number;
  imagesLength: number;
  itemMargin: number;
}

const useCarouselScroll = ({
  contentWidth,
  imageWidth,
  imagesLength,
  itemMargin,
}: IUseCarouselScrollProps) => {
  const contentRef = useRef<HTMLUListElement>(null);
  const [dragStart, setDragStart] = useState(0);
  const [translation, setTranslation] = useState(0);
  const [virtualPage, setVirtualPage] = useState(0);
  const [visibleMinIndex, setVisibleMinIndex] = useState(0);

  const animate = (translate: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${translate}px)`;
    }
  };

  const translate = (dx: number) => {
    const adjustedImageWidth = imageWidth + itemMargin * 2;
    let tempTranslation = -(translation + dx);
    const actualContentWidth = contentWidth / 2;

    if (tempTranslation > actualContentWidth) {
      tempTranslation -= actualContentWidth;
      setVirtualPage((prev) => prev + 1);
    }

    if (tempTranslation < 0 && virtualPage > 0) {
      tempTranslation += actualContentWidth;
      setVirtualPage((prev) => prev - 1);
    }

    setVisibleMinIndex(Math.floor(tempTranslation / adjustedImageWidth) % imagesLength);

    if (tempTranslation >= 0 && tempTranslation <= actualContentWidth) {
      animate(-tempTranslation);
      setTranslation(-tempTranslation);
    }
  };

  const handleScroll = (
    event: TouchEvent<HTMLUListElement> | WheelEvent<HTMLUListElement>
  ) => {
    if (event.type === "touchstart") {
      setDragStart((event as TouchEvent<HTMLUListElement>).targetTouches[0].pageX);
    } else if (event.type === "touchmove") {
      const touchEvent = event as TouchEvent<HTMLUListElement>;
      if (touchEvent.targetTouches[0].pageX === 0) return;
      const dragDistance = (touchEvent.targetTouches[0].pageX - dragStart) * 1.8;
  
      translate(dragDistance);
      setDragStart(touchEvent.targetTouches[0].pageX);
    } else if (event.type === "wheel") {
      const wheelEvent = event as WheelEvent<HTMLUListElement>;

      translate(wheelEvent.deltaY);
    }
  };

  return {
    contentRef,
    translation,
    visibleMinIndex,
    handleScroll,
  };
};

export default useCarouselScroll;
