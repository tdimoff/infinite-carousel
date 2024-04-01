import { IImage } from "../../interfaces/IImage.interface";
import styles from "./Image.module.scss";

interface IImageProps {
  image: IImage;
}

const Image = ({ image }: IImageProps) => (
  <div className={styles["image-container"]}>
    <img src={image.url} alt={image.description} loading="lazy" />
  </div>
);

export default Image;
