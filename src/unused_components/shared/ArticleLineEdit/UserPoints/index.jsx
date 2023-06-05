import React from "react";
import styled from "styled-components";

const UserPoints = ({ userPoints = [] }) => {
  return (
    <StyledPoints>
      <ul>
        {userPoints?.map((kp, i) => (
          <li key={`keypoint${i}`}>{kp}</li>
        ))}
      </ul>
    </StyledPoints>
  );
};

const StyledPoints = styled.div`
  font-size: 0.7em;
  font-weight: 300;
`;

export default UserPoints;
