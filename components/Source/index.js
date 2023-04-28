import React from "react";
import styles from "./styles.module.css";

const Source = ({ source, size = "small" }) => {
  const imageHeight = { small: 30, medium: 50, large: 80, wide: 80 };
  const imageWidth = { small: 40, medium: 60, large: 100, wide: 120 };

  return (
    <div
      className={styles.StyledImage}
      style={{
        backgroundImage: `url(https://storygraf.s3.us-east-2.amazonaws.com/sources/${source?.data?.sourceImage})`,
        height: imageHeight[size],
        width: imageWidth[size],
        backgroundSize: "cover",
      }}
    />
  );
};

export default Source;
