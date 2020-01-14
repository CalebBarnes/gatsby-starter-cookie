import { createGlobalStyle, css } from "styled-components"
import { typographyString } from "./typography"
import { colors } from "./index"

import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${typographyString};
    img {
      margin-bottom: 0;
    }
    body {
      background: ${colors.darkBackground};
    }

`
export default GlobalStyle
