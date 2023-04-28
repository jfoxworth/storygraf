/** @type { import('@storybook/react').Preview } */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { UserProvider } from "../Contexts/UserContext";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <UserProvider initialValue={{ name: "test" }}>
      <Story />
    </UserProvider>
  ),
];
