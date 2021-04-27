import { createGlobalStyle, css } from 'styled-components';
import globalFontStyle from './globalFontStyle';

const reset = css`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  * {
    box-sizing: border-box;
  }
  html {
    line-height: 1;
  }
  body {
    overflow-x: hidden;
  }
  ol, ul, li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    transition: .5s;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    &:hover,
    &:focus,
    &:active {
      outline: 0;
      box-shadow: none;
      text-decoration: none;
    }
    &:hover {
      opacity: .7;
    }
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
  button {
    transition: .5s;
  }
  button, input, a, select {
    border: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  input {
    &:-webkit-autofill {
      background: ${(props) => props.theme.color.white} !important;
      -webkit-box-shadow: 0 0 0px 1000px white inset;
    }
  }
  @media (max-width: 1280px) {
    html {
      font-size: 80%;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${globalFontStyle}
`;

export default GlobalStyle;
