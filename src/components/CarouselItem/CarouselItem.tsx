import styles from "./CarouselItem.module.scss";
import Image from "../Image/Image";
import { IImage } from "../../interfaces/IImage.interface";

interface ICarouselItemProps {
  image: IImage;
}

const CarouselItem = ({ image }: ICarouselItemProps) => (
  <li className={styles["carousel-item"]}>
    <Image image={image} />
  </li>
);

export default CarouselItem;
