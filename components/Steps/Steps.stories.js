import Steps from "./index.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Compound/Steps",
  component: Steps,
  args: {
    step: 0,
    setStep: () => {},
    steps: ["First", "Second", "Third"],
  },
};

export const StepsDefault = {
  args: {
    step: 0,
    setStep: () => {},
    steps: ["First", "Second", "Third"],
  },
};
