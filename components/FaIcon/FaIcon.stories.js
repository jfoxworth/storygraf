import FaIcon from "./index.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Simple/FaIcon",
  component: FaIcon,
  args: {
    icon: "Tag",
  },
};

export const DefaulWithTag = {
  args: {
    icon: "Tag",
  },
};

export const TagRed = {
  args: {
    icon: "Tag",
    color: "#FF0000",
  },
};

export const TagGreen = {
  args: {
    icon: "Tag",
    color: "#00FF00",
  },
};

export const TagRedCircle = {
  args: {
    icon: "Tag",
    color: "#FF0000",
    outlineType: "circle",
  },
};

export const TagBlueSquare = {
  args: {
    icon: "Tag",
    color: "#0000FF",
    outlineType: "square",
  },
};

export const User = {
  args: {
    icon: "User",
  },
};

export const CommentDollar = {
  args: {
    icon: "CommentDollar",
  },
};
