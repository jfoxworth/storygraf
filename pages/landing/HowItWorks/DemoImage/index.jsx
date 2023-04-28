import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";

const DemoImage = () => {
  const Tag = ({ color, text }) => {
    return (
      <div
        style={{
          margin: "4px 0px 0px 10px",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            padding: "4px 8px 4px 8px",
            borderRadius: "10px",
            fontSize: "0.7em",
            display: "inline-block",
            color: "#FFFFFF",
          }}
        >
          {text}
        </div>
      </div>
    );
  };

  const TagWrapper = (props) => {
    return <div style={{ margin: "4px 0px 0px 8px" }}>{props.children}</div>;
  };

  const Article = () => {
    return (
      <div
        style={{
          padding: "4px 8px 4px 8px",
          fontSize: "0.7em",
          borderBottom: "1px solid #ccc",
          display: "inline-block",
          margin: "0px 12px 0px 20px",
          fontStyle: "italic",
        }}
      >
        <div style={{ padding: "4px 8px 4px 8px" }}>Title of Article</div>
        <div style={{ padding: "4px 8px 4px 8px" }}>
          Text describing what info the article adds to the story
        </div>
      </div>
    );
  };

  return (
    <Container>
      <div className={styles.pageWrapper}>
        <Row>
          <Col>
            <div className={styles.titleText}>Storygraf</div>
            <TagWrapper>
              <Tag color="#FF0000" text="Sports"></Tag>
              <TagWrapper>
                <Tag color="#00FF00" text="US Football"></Tag>
                <TagWrapper>
                  <Tag color="#0000FF" text="Cleveland Browns"></Tag>
                  <TagWrapper>
                    <Tag color="#48353a" text="Deshaun Watson"></Tag>
                    <TagWrapper>
                      <Tag color="#798C1C" text="Draft"></Tag>
                    </TagWrapper>
                    <TagWrapper>
                      <Tag color="#FF00FF" text="Massage Scandal"></Tag>
                      <Article />
                    </TagWrapper>
                    <TagWrapper>
                      <Tag
                        color="#676299"
                        text="Trade to Cleveland Browns"
                      ></Tag>
                      <Article />
                      <Article />
                    </TagWrapper>
                  </TagWrapper>
                </TagWrapper>
              </TagWrapper>
            </TagWrapper>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DemoImage;
