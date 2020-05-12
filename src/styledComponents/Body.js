import styled from "styled-components";

export const Body = styled.div`
    height: 86vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BodyWrapperForm = styled(Body)`
    width: 40vw;
`;

export const BodyWrapperTable = styled(Body)`
    width: 60vw;
`;

export const FormWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eceff1;
    box-shadow: 0 15px 30px 4px rgba(0, 0, 0, 0.5);
`;

export const TableWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 500px;
    border-left: 2px gray solid;
    border-right: 2px gray solid;
    border-top: 2px gray solid;
    box-shadow: 0 30px 15px -15px rgba(1, 1, 1, 0.5);
`;

export const Form = styled.div`
    width: 80%;
`;

export const ButtonsWrapper = styled.div`
    width: 100%;
    padding: 50px 0 0 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;