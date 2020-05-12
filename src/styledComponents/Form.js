import styled from "styled-components";

export const FormGroup = styled.div`
    width: 100%;
    position: relative;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 5px 0;
`;

export const FormInput = styled.input`
    height: 50px;
    width: 50%;
    padding: 0 15px 0 15px;
    
    outline:none;
    :focus {
        border: 2px #43a047 solid;
    }
`;

export const FormSelect = styled.select`
    height: 50px;
    width: 50%;
    padding: 0 15px 0 15px;
    outline:none;
    :focus {
        border: 2px #43a047 solid;
    }
`;