import Landing from "../index.js";
import { UserProvider } from "../../Contexts/UserContext.js";
import { Container } from "react-bootstrap";

export default {
  title: "Pages/Landing",
  component: Landing,
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

export const LandingPage = {};
