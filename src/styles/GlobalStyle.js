import { createGlobalStyle } from "styled-components";
import "../assets/fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
html, body{
    font-size: 14px;
    font-family:"Noto Sans KR";
    min-height:100vh;
}
p {
    font-size: medium;
}
`;

export default GlobalStyle;
