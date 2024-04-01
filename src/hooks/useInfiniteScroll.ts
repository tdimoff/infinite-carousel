import { useState, useRef } from "react";
import { WheelEvent, TouchEvent } from "react";

interface IUseInfiniteScroll {
  spacing: number;
  imageWidth: number;
  imageCount: number;
}

const useInfiniteScroll = ({
  spacing,
  imageWidth,
  imageCount,
}: IUseInfiniteScroll) => {
  const contentRef = useRef<HTMLUListElement>(null);
  const [translation, setTranslation] = useState(0);
  const [virtualPage, setVirtualPage] = useState(0);
  const [dragStart, setDragStart] = useState(0);

  const animate = (translate: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${translate}px)`;
    }
  };

  const translate = (deltaY: number) => {
    const imageWidthWithMargin = imageWidth + spacing * 2;
    const realContentWidth = (imageWidthWithMargin * imageCount) / 2;
    let tempTranslation = -(translation + deltaY);

    if (tempTranslation > realContentWidth) {
      tempTranslation -= realContentWidth;
      setVirtualPage((prev) => prev + 1);
    }

    if (tempTranslation < 0 && virtualPage > 0) {
      tempTranslation += realContentWidth;
      setVirtualPage((prev) => prev - 1);
    }

    if (tempTranslation >= 0 && tempTranslation <= realContentWidth) {
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
      const dragDistance = (touchEvent.targetTouches[0].pageX - dragStart) * 2;
  
      translate(dragDistance);
      setDragStart(touchEvent.targetTouches[0].pageX);
    } else if (event.type === "wheel") {

      translate((event as WheelEvent).deltaY);
    }
  };

  return {
    contentRef,
    handleScroll,
  };
};

export default useInfiniteScroll;
