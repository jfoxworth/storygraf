import InputWrapper from "./index.jsx";
import { Form } from "react-final-form";
import { Container } from "react-bootstrap";

export default {
  title: "Forms/InputWrapper",
  component: InputWrapper,
  decorators: [
    (Story) => (
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container>
                <Story />
              </Container>
            </form>
          );
        }}
      />
    ),
  ],
  args: {
    label: "Label for input",
    placeholder: "Placeholder text",
    required: true,
    name: "Input name",
    type: "text",
  },
};

export const InputDefault = {
  args: {
    label: "Label for input",
    placeholder: "Placeholder text",
    required: false,
    name: "Input name",
    type: "text",
  },
};

export const InputRequired = {
  args: {
    label: "Label for input",
    placeholder: "Placeholder text",
    required: true,
    name: "Input name",
    type: "text",
  },
};
