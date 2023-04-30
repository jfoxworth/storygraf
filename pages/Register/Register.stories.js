import Register from "./index.jsx";
import { UserProvider } from "../../Contexts/UserContext.js";
import { Container } from "react-bootstrap";

export default {
  title: "Pages/Register",
  component: Register,
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

export const RegisterPage = {};

export const RegisterPageLoggedIn = {
  args: {
    initialValue: {
      username: "The Wolf",
      email: "joshuaFoxworth@awesome.com",
    },
  },
};
