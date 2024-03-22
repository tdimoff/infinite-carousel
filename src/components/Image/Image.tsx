import styles from "./Image.module.scss";

interface IImageProps {
  src: string;
  alt: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const Image = ({ src, alt, objectFit = "cover" }: IImageProps) => (
  <div className={styles["image-container"]}>
    <img src={src} alt={alt} style={{ objectFit }} className={styles.image} />
  </div>
);

export default Image;
