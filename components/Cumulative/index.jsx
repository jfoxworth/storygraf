/*
    This is a simple component to display the steps in a process

*/

import React from "react";
import { Badge } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "./styles.module.css";

const Cumulative = ({ cumItem, showText = true }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{cumItem.text}</Popover.Body>
    </Popover>
  );

  return (
    <div
      className={styles.CumulativeDiv}
      style={{ backgroundColor: cumItem.color }}
    >
      {showText && (
        <>
          <div className={styles.CumulativeText}>{cumItem.text}</div>
          <Badge pill bg="secondary">
            <div className={styles.BadgeText}>{cumItem.value || 0}</div>
          </Badge>
        </>
      )}
      {!showText && (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <div className={styles.CumulativeText}>{cumItem.value || 0}</div>
        </OverlayTrigger>
      )}
    </div>
  );
};

export default Cumulative;
