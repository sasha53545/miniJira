import styled from "styled-components";

export const Header = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
    background-color: #9e9e9e;
    box-shadow: 0 15px 30px 4px rgba(0, 0, 0, 0.5);
    font-weight: 600;   
    cursor: default;
`;

export const HeaderNav = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 1.2em;
`;

export const HeaderNavItem = styled.div`
    position: relative;
    padding: 0 30px 0 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    :before {
        position:absolute;
        left: -0px;
        bottom: 0px;
        content: " ";
        border-bottom: 5px solid black;
        transform: scale(0,1);
        width:100%;
        transition: transform 0.6s;
    }

    :hover:before {
        transform: scale(1,1);
    }
`;