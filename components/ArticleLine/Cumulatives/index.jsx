import React from "react";
import { Row, Col } from "react-bootstrap";
import Cumulative from "../../Cumulative";

const Cumulatives = ({ cumulatives = [], parentTag = {} }) => {
  const matchTagColor = (tag, cumItem) => {
    let badgeColor = "#CCCCCC";
    tag?.data?.cumulatives?.forEach((cum) => {
      if (cum.text === cumItem.text) {
        badgeColor = cum.color;
      }
    });
    return badgeColor;
  };

  return (
    <>
      {cumulatives.length > 0 && (
        <>
          {cumulatives.map((cumItem, i) => (
            <Cumulative
              showText={false}
              key={`cumulative${i}`}
              cumItem={{
                ...cumItem,
                color: matchTagColor(parentTag, cumItem),
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Cumulatives;
