import styled, {keyframes} from "styled-components";

export const animateTableRow = keyframes`
    from {
        border: 1px white solid;
    }

    to {
        box-shadow: 0 0 10px #43a047, 0 0 40px #43a047, 0 0 80px #43a047;
        background-color: #43a047;
        color: white;
        border: 1px #43a047 solid;
    }
`;

export const Table = styled.table`
    width: 100%;
`;

export const TableHeadRow = styled.tr`
    height: 70px;
`;

export const TableBodyRow = styled.tr`
    height: 60px;
    border-top: 1px gainsboro inset;
    
    &:hover {
    cursor: pointer;
    animation: ${animateTableRow} .5s ease-in-out;
    animation-fill-mode: forwards;
    }
`;

export const TableImageWrapper = styled.td`
    text-align: center;
    width: 24%;
`;

export const TableImage = styled.img`
    width: 25%;
    height: 40%;
`;
