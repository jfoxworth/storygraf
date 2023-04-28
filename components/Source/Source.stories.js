import Source from "./index.js";
import { Container } from "react-bootstrap";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Simple/Source",
  component: Source,
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "ycombinator.jpg",
        sourceName: "YCombinator",
        sourceUrl: "ycombinator.com",
      },
      id: "YCOMBINATOR",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "small",
  },
};

export const YCombinatorSmall = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "ycombinator.jpg",
        sourceName: "YCombinator",
        sourceUrl: "ycombinator.com",
      },
      id: "YCOMBINATOR",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "small",
  },
};

export const YCombinatorMedium = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "ycombinator.jpg",
        sourceName: "YCombinator",
        sourceUrl: "ycombinator.com",
      },
      id: "YCOMBINATOR",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "medium",
  },
};

export const YCombinatorLarge = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "ycombinator.jpg",
        sourceName: "YCombinator",
        sourceUrl: "ycombinator.com",
      },
      id: "YCOMBINATOR",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "large",
  },
};

export const CNNSmall = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "cnn.jpg",
        sourceName: "CNN",
        sourceUrl: "cnn.com",
      },
      id: "CNN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "small",
  },
};

export const CNNMedium = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "cnn.jpg",
        sourceName: "CNN",
        sourceUrl: "cnn.com",
      },
      id: "CNN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "medium",
  },
};

export const CNNLarge = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "cnn.jpg",
        sourceName: "CNN",
        sourceUrl: "cnn.com",
      },
      id: "CNN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "large",
  },
};

export const CNNWide = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "cnn.jpg",
        sourceName: "CNN",
        sourceUrl: "cnn.com",
      },
      id: "CNN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "wide",
  },
};

export const DMNSmall = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "dmn.jpg",
        sourceName: "DMN",
        sourceUrl: "dmn.com",
      },
      id: "DMN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "small",
  },
};

export const DMNMedium = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "dmn.jpg",
        sourceName: "DMN",
        sourceUrl: "dmn.com",
      },
      id: "DMN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "medium",
  },
};

export const DMNLarge = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "dmn.jpg",
        sourceName: "DMN",
        sourceUrl: "dmn.com",
      },
      id: "DMN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "large",
  },
};

export const DMNWide = {
  args: {
    source: {
      created_at: "",
      data: {
        description: "",
        sourceImage: "dmn.jpg",
        sourceName: "DMN",
        sourceUrl: "dmn.com",
      },
      id: "DMN",
      sourceType: "hard",
      type: "SOURCE",
    },
    size: "wide",
  },
};
