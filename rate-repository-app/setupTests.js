import "@testing-library/jest-native/extend-expect";

jest.mock("react-native/Libraries/Image/Image", () => ({
  __esModule: true,
  default: "Image",
}));

jest.mock("react-native/Libraries/Text/Text", () => ({
  __esModule: true,
  default: "Text",
}));
