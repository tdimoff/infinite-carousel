import styles from "./Image.module.scss";

interface IImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
}

const Image = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "contain",
  objectPosition = "center",
}: IImageProps) => (
  <div style={{ width, height }}>
    <img
      src={src}
      alt={alt}
      style={{ objectFit, objectPosition }}
      className={styles.image}
    />
  </div>
);

export default Image;
