import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
*, 
*:before, 
*:after {
  box-sizing: border-box;
}

body {
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white}
}
`;

export default GlobalStyle;
