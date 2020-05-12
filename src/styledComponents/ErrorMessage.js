import styled, {keyframes} from "styled-components";

const animateErrorMessage = keyframes`
    0% {
        display: none;
        opacity: 0;
    }

    100% {
        display: flex;
        opacity: 1;
    }
`;

export const Error = styled.div`
    width: 100%;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7vh;
    margin-top: 30px;
    background-color: #f44336;
    animation: ${animateErrorMessage} .7s ease-in-out;
`;