import Navbar from "./index.js";
import { Container } from "react-bootstrap";
import { UserProvider } from "../../Contexts/UserContext.js";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Compound/Navbar",
  component: Navbar,
  args: {},
  decorators: [
    (Story, args) => (
      <Container>
        <UserProvider initialValue={args?.args?.initialValue}>
          <div style={{ transform: "scale(1)", minHeight: "100px" }}>
            <Story />
          </div>
        </UserProvider>
      </Container>
    ),
  ],
};

export const LoggedIn = {
  args: { initialValue: { data: { username: "The Wolf" } } },
};

export const NotLoggedIn = {
  args: {},
};
