import { createGlobalStyle } from "styled-components";
import { COLORS } from "@constants";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    margin: 0;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    height: auto; /* ✅ Allow scroll */
  }

  #__next {
    color: ${COLORS.FONT_GRAY_MEDIUM};
    min-height: 100vh;
  }

  body {
    min-width: 250px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  strong {
    font-weight: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${COLORS.FONT_GRAY_DARK};
  }




  ul, menu, li {
    padding: 0;
    list-style: none;
  }

  svg {
    user-select: none;
  }

  #tidio-chat {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 99999 !important;
  pointer-events: auto !important;
  height: 90vh !important; /* 👈 adjust this as needed */
  width: 400px !important;
  transform: none !important;

  /* 🔥 Disable pointer events for container itself */
  pointer-events: none !important;
}

#tidio-chat iframe {
  // height: auto !important;
  max-height: 200px !important;
  width: auto !important;
  max-width: 100vw !important;

  /* ✅ Enable pointer events only on the iframe */
  pointer-events: auto !important;
}
`;

export default GlobalStyle;
