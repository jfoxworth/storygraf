/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.@(js|jsx|ts|tsx)", "../modals/**/*.mdx", "../modals/**/*.stories.@(js|jsx|ts|tsx)", "../pages/**/*.mdx", "../pages/**/*.stories.@(js|jsx|ts|tsx)", "./docs/**/*.mdx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-styling", "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
};
export default config;