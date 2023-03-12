import React from "react";
import styled from "styled-components";

const Source = ({ source, size = "small" }) => {
  const imageSize = { small: 30, large: 80 };

  return (
    <StyledImage
      url={`https://storygraf.s3.us-east-2.amazonaws.com/sources/${source?.data?.sourceImage}`}
      height={imageSize[size]}
    />
  );
};

const StyledImage = styled.div`
  background-image: url("${(props) => props.url}");
  height: 40px;
  width: 40px;
  background-size: cover;
  border-radius: 15px;
  padding: 0;
  border: 1px solid #ccc;
  background-position: center;
`;

export default Source;
