import Login from "./index.jsx";
import { UserProvider } from "../../Contexts/UserContext.js";
import { Container } from "react-bootstrap";

export default {
  title: "Pages/Login",
  component: Login,
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

export const LoginPage = {};

export const LoginPageLoggedIn = {
  args: {
    initialValue: {
      data: { username: "The Wolf", email: "joshuaFoxworth@awesome.com" },
    },
  },
};
