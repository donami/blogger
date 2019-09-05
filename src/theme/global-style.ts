// import { createGlobalStyle } from './styled';

import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, 
  body {
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    /* min-height: 100%; */
  }
  ul {
    list-style: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 300;
  }
  img {
    max-width: 100%;
  }

  #root {
    min-height: 100%;
    display: flex;
  }
`;

export default GlobalStyle;
