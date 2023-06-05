import Steps from "./index.jsx";
import { userEvent, within } from "@storybook/testing-library";

export default {
  title: "Compound/Steps",
  component: Steps,
  args: {
    step: 0,
    setStep: () => {},
    steps: ["First", "Second", "Third"],
  },
};

const Template = (args) => <Steps {...args} />;

export const StepsDefault = Template.bind({});
StepsDefault.args = {
  step: 0,
  setStep: () => {},
  steps: ["First", "Second", "Third"],
};

// https://www.youtube.com/watch?v=dcuzwCHI940
StepsDefault.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Make sure that the step can be clicked on
  userEvent.click(canvas.getByText("1"));
};
