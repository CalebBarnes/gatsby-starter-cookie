import Typography from "tyjs"
import breakpoint from "./breakpoints"
import colors from "./colors"

const typeConfig = {
  bodyFontFamily: ["Quattrocento Sans", "sans-serif"],
  headerFontFamily: ["Work Sans", "sans-serif"],
  headerColor: colors.headline,
  bodyColor: colors.paragraph,
  bodyWeight: 400,
  headerWeight: 600,
  baseFontSize: "20px",
  baseLineHeight: 1.45,
  scaleRatio: 2,
  blockMarginBottom: 1,
  // includeNormalize: false,
  // breakpoints: {
  //   [`@media screen and (min-width:${breakpoint.small})`]: {
  //     scaleRatio: 2.5,
  //   },
  //   [`@media screen and (min-width:${breakpoint.large})`]: {
  //     baseFontSize: "16px",
  //     scaleRatio: 2.8,
  //   },
  //   [`@media screen and (min-width:${breakpoint.xlarge})`]: {
  //     baseFontSize: "18px",
  //     scaleRatio: 3.2,
  //   },
  // },
  // overrideStyles: ({ rhythm, ...rest }) => {
  //   return {
  //     h1: {},
  //     h2: {},
  //     h5: {},
  //     h6: {},
  //     p: {
  //       color: colors.paragraph,
  //     },
  //     "p.intro": {
  //       fontSize: "1.2rem",
  //     },
  //     [`@media screen and (min-width:${breakpoint.xlarge})`]: {
  //       h1: {
  //         fontSize: "60px",
  //       },
  //       h2: {
  //         fontSize: "48px",
  //       },
  //       h3: {
  //         fontSize: "36px",
  //       },
  //       h4: {
  //         fontSize: "24px",
  //       },
  //       h5: {
  //         fontSize: "22px",
  //       },
  //       h6: {
  //         fontSize: "18px",
  //       },
  //     },
  //   }
  // },
}

const typography = new Typography(typeConfig)
const Rhythm = typography.rhythm
const typographyString = typography.toString()

export { Rhythm, typographyString }
