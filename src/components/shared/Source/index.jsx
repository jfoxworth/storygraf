import React from "react";
import "../../../main.css";

const Source = ({ source, size = "small" }) => {
  const imageSize = { small: 30, large: 80 };

  return (
    <img
      src={`https://storygraf.s3.us-east-2.amazonaws.com/sources/${source?.data?.sourceImage}`}
      height={imageSize[size]}
      alt={source?.data?.sourceName}
    />
  );
};

export default Source;
