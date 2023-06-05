import React from "react";
import Source from "../../Source";
import styled from "styled-components";

const ArticleImage = ({ article }) => {
  return (
    <StyledWrapper>
      {article?.data?.image?.url && (
        <>
          <StyledImage url={article?.data?.image?.url}></StyledImage>
          <SourceWrapper>
            <Source source={article?.data?.source || article?.source} />
          </SourceWrapper>
        </>
      )}
      {!article?.data?.image?.url && (
        <>
          <StyledImage
            url={`https://storygraf.s3.us-east-2.amazonaws.com/sources/${article.data.source?.data?.sourceImage}`}
          ></StyledImage>
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 0px;
  width: 100%;
  position: relative;
`;

const SourceWrapper = styled.div`
  padding: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const StyledImage = styled.div`
  background-image: url("${(props) => props.url}");
  width: 100%;
  height: 80px;
  width: 80px;
  background-size: cover;
  border-radius: 40px;
  padding: 0;
  border: 1px solid #ccc;
  background-position: center;
  margin: auto;
`;

export default ArticleImage;
