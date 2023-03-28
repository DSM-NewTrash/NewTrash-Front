import { DefaultTheme } from "styled-components";

const colors = {
  greanScale: {
    main: "#AFDCAB",
    grean: "69D2A6",
    Dark_Grean: "#ACC7B4",
    Light_Grean: "#6BC662",
  },
  grayScale: {
    Light_Gray: "#F2F2F2",
    Gray: "#D7D7D7",
    Dark_Gray: "#BBBCBD",
    Very_Dark_Gray: "#959697",
  },
  star: "#FFD233",
  TextColor: "#766D6D",
  white: "#FFFFFF",
  black: "#000000",
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
