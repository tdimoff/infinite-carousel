import { IImage } from "../../interfaces/IImage.interface";
import styles from "./CarouselItem.module.scss";
import Image from "../Image/Image";

interface IImageItemProps {
  image: IImage;
  isVisible: boolean;
}

const CarouselItem = ({ image, isVisible }: IImageItemProps) => {
  return (
    <li className={styles["carousel-item"]}>
      {isVisible && <Image src={image.url} alt={image.title} />}
    </li>
  );
};

export default CarouselItem;
