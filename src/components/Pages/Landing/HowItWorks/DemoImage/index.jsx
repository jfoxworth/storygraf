import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

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
            "background-color": color,
            padding: "4px 8px 4px 8px",
            "border-radius": "10px",
            "font-size": "0.7em",
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
          "font-size": "0.7em",
          "border-bottom": "1px solid #ccc",
          display: "inline-block",
          margin: "0px 12px 0px 20px",
          "font-style": "italic",
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
      <PageWrapper>
        <Row>
          <Col>
            <TitleText>Storygraf</TitleText>
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
      </PageWrapper>
    </Container>
  );
};

const PageWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const TitleText = styled.div`
  color: rgb(145, 147, 150);
  font-size: 0.8em;
  text-align: center;
`;

export default DemoImage;
