import styled from "styled-components"
import * as theme from "../../theme"

const Input = styled.input`
  margin-bottom: 15px;
  color: white;
  border: 0;
  border-radius: 2px;

  background-color: ${theme.colors.lightBackground};
  &:hover {
    filter: brightness(110%);
  }
  padding: 10px 20px;
`

export default Input
