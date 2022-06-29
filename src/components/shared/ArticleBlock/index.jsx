/*  
  This is a component that displays an article in the
  same way that it is displayed on Facebook.
*/
import React from "react";

const ArticleBlock = ({ article, width = "100%", height = "300px" }) => {
  return (
    <div
      style={{
        width: width,
        border: "1px solid #CCCCCC",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: width,
          backgroundImage: "url(" + article.data.image + ")",
          height: height,
          backgroundSize: "cover",
          borderRadius: "5px 5px 0px 0px",
        }}
      ></div>
      <div style={{ fontSize: "1.1em", fontWeight: "bold", margin: "10px" }}>
        {article.title}
      </div>
      <div style={{ fontSize: "0.9em", color: "#444", margin: "10px" }}>
        {article.data.description}
      </div>
      <div style={{ fontSize: "0.8em", color: "#AAA", margin: "5px" }}>
        {article.data.site_name}
      </div>
    </div>
  );
};

export default ArticleBlock;
