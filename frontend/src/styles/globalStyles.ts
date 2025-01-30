import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
    margin: 0;
    padding: 0;
    // box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0;
    background: ${({ theme }) => theme.colors.lightGray};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100%;
  }

  svg {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, p, ul, ol, dl, li {
    font-family: ${({ theme }) => theme.fontFamily};
    font-style: normal;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: ${({ theme }) => theme.fontFamily};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: ${({ theme }) => theme.transition};
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fontFamily};
    border: none;
    outline: none;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .container {
  width: 100%; 
  padding: 0 20px; 
  margin: 0 auto; 
  
}

@media (min-width: 320px) {
  .container {
    max-width: 100%; 
  }
}

@media (min-width: 375px) {
  .container {
    max-width: 375px; 
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 32px;
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1440px;
    padding: 0 100px;
  }
}
`;
