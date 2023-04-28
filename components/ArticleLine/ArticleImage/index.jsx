import React from "react";
import Source from "../../Source";
import styles from "./styles.module.css";

const ArticleImage = ({ article }) => {
  return (
    <>
      {article?.data?.image?.url && (
        <div className={styles.StyledWrapper}>
          <div
            className={styles.StyledImage}
            style={{
              backgroundImage: "url(" + article?.data?.image?.url + ")",
            }}
          >
            <div className={styles.SourceWrapper}>
              <Source source={article?.data?.source || article?.source} />
            </div>
          </div>
        </div>
      )}
      {!article?.data?.image?.url && (
        <div className={styles.StyledWrapperSource}>
          <div
            className={styles.StyledImage}
            style={{
              backgroundImage: `url(https://storygraf.s3.us-east-2.amazonaws.com/sources/${article.data.source?.data?.sourceImage}`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ArticleImage;
