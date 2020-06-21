import {keyframes} from "styled-components";

export const animateInputTask = keyframes`
  0% {
    opacity: 0;
    height: 0px;
    margin: 0 0 0px 0;
}
  100% {
    opacity: 1;
    height: 40px;
    margin: 0 0 20px 0;
}
`;

export const animateButtonPlusTask = keyframes`
  0% {
    opacity: 1;
}
  100% {
    opacity: 0;
}
`;
