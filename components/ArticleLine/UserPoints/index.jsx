import React from "react";
import styles from "./styles.module.css";

const UserPoints = ({ userPoints = [] }) => {
  return (
    <div className={styles.StyledPoints}>
      <ul>
        {userPoints?.map((kp, i) => (
          <li key={`keypoint${i}`}>{kp}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPoints;
