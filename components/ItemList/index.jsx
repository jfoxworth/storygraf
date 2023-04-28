import React from "react";
import ArticleLine from "../ArticleLine";
import styles from "./styles.module.css";
import { Row, Col } from "react-bootstrap";

const ItemList = ({
  items = [],
  parentTag = {},
  handleShowDeleteItem = () => {},
}) => {
  return (
    <>
      {items
        .sort((a, b) =>
          a.itemDate < b.item_date ? 1 : b.itemDate < a.itemDate ? -1 : 0
        )
        .map((article, i) => (
          <>
            <Row>
              <Col xs={{ span: 3 }} md={{ span: 2 }}>
                {i !== 0 && <div className={styles.vertLine} />}
              </Col>
            </Row>
            <ArticleLine
              article={article}
              parentTag={parentTag}
              key={`article${i}`}
              handleShowDeleteItem={handleShowDeleteItem}
            />
          </>
        ))}
    </>
  );
};

export default ItemList;
