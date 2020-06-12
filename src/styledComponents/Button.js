import styled, {keyframes} from "styled-components";
import ButtonRectangle from "../svg/ButtonRectangle";

export const animateHoverButton = keyframes`
    from {
    }

    to {
        fill: white;
        box-shadow: 0 0 10px #43a047, 0 0 40px #43a047, 0 0 80px #43a047;
        background-color: #43a047;
        color: white;
    }
`;

export const SvgButton = styled(ButtonRectangle)`
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 50px;
    
    stroke: black;
    stroke-width: 3px;
    stroke-dasharray: 400, 0;
    transition: 0.6s;
    
    :hover {
        stroke: #43a047;
        stroke-width: 6px;
        stroke-dasharray: 35, 260;
        stroke-dashoffset: 38;
    }
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    position: relative;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    
    :hover {
        animation: ${animateHoverButton} .4s ease-in-out 0.4s;
        animation-fill-mode: forwards;
    }
`;

export default Button;
