import Cumulative from "./index.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Simple/Cumulative",
  component: Cumulative,
};

export const CumulativeWithText = {
  args: {
    cumItem: { value: "132", text: "Funded Companies", color: "#188b26" },
    showText: true,
  },
};

export const CumulativeNoText = {
  args: {
    cumItem: { value: "132", text: "Funded Companies", color: "#188b26" },
    showText: false,
  },
};
