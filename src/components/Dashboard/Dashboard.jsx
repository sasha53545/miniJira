import React, {useEffect, useState} from "react";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {nextPreviousIcon} from "../../images/svg";
import {useDispatch, useSelector} from "react-redux";
import {boardGetRequest} from "../../reducers/board";
import {localStorageRemoveItemRequest} from "../../reducers/auth";
import styled, {keyframes} from "styled-components";
import ButtonJS from './../../Tabs/Button/Button';

//----------STYLED_COMPONENTS-----------
//---------------------------------------animation--
const animate = keyframes`
    from {
    }

    to {
        background-color: #43a047;
        color: white;
    }
`;

export const animateHoverButtons = keyframes`
    from {
    }

    to {
        fill: white;
        box-shadow: 0 0 10px #43a047, 0 0 40px #43a047, 0 0 80px #43a047;
        background-color: #43a047;
        color: white;
    }
`;

export const animateRipple = keyframes`
    0% 
    {
        width: 0px;
        height: 0px;
    }
    100%
    {
    width: 500px;
    height: 500px;
    opacity: 0;
    }
`;

//---------------------------------------header--
const Header = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
    background-color: #9e9e9e;
    box-shadow: 0 15px 30px 4px rgba(0, 0, 0, 0.5);
    font-weight: 600;
`;

const HeaderTitle = styled.div`
    cursor: default;
`;

const HeaderNavigation = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    font-size: 1.2em;
`;
//---------------------------------------body--
const Body = styled.div`
    height: 86vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BodyWrapper = styled(Body)`
    width: 60vw;
`;

const Board = styled.div`
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

const BoardTable = styled.table`
    width: 100%;
`;

const BoardTableHeadRow = styled.tr`
    height: 70px;
`;

const BoardTableBodyRow = styled.tr`
    height: 60px;
    border-top: 1px gainsboro inset;
    
    &:hover {
    cursor: pointer;
    animation: ${animate} .6s ease-in-out;
    animation-fill-mode: forwards;
    }
`;

const Image = styled.img`
    width: 25%;
    height: 40%;
`;

const BoardButtons = styled.div`
    position: absolute;
    bottom: 0;
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const Button = styled.div`
    display: flex;
    align-items: center;
    width: 150px;
    height: 50px;
    position: relative;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    
    :hover {
        animation: ${animateHoverButtons} .6s ease-in-out 0.6s;
        animation-fill-mode: forwards;
    }
`;

const ButtonAddField = styled(Button)`
    justify-content: center;
`;

const Rectangle = styled.rect`
    stroke: black;
    stroke-width: 3px;
    stroke-dasharray: 400, 0;
    transition: 1s;
    
    ${Button}:hover & {
        stroke: #43a047;
        stroke-width: 6px;
        stroke-dasharray: 35, 260;
        stroke-dashoffset: 38;
    }
    
`;

const RippleHelper = styled.span`
    position; absolute;
    background: #fff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    animation: animate 1s linear infinite;
`;

const SvgButton = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 50px;
`;

const TextNext = styled.div`
    padding-left: 25px;
`;

const TextPrevious = styled.div`
    padding-right: 25px;
`;

const SvgNextWrapper = styled.div`
    transform: rotate(180deg);
`;

const SvgPreviousWrapper = styled.div`
    :hover {
        animation: ${animateHoverButtons} .6s ease-in-out 0.6s;
        animation-fill-mode: forwards;
    }
`;

const TdImage = styled.td`
    text-align: center;
    width: 15%;
`;

const ButtonPreviousNext = styled(Button)`
    justify-content: space-between;
`;

const ButtonPreviousNextWrapper = styled.div`
    width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ErrorWrapper = styled.div`
    width: 100%;
    padding-top: 20px;
`;

//---------------------------------------footer--
const FooterWrap = styled.div`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    bottom: 0;
`;

const Dashboard = () => {
    const board = useSelector(state => state.board.data);
    const loader = useSelector(state => state.board.loader);
    const error = useSelector(state => state.board.error);
    const dispatch = useDispatch();

    const [tablePage, setTablePage] = useState({
        page: 0,
        amount: 5
    });
    const [coord, setCoord] = useState({x: 0});

    useEffect(() => {
        dispatch(boardGetRequest());
    }, [boardGetRequest]);

    return (
        <div>
            {(loader === true) ?
                <Preloader/> :
                <div>
                    <Header>
                        <HeaderTitle>
                            <h1>MiniJira</h1>
                        </HeaderTitle>
                        <HeaderNavigation>
                            <div onClick={() => dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}))}>
                                Log Out
                            </div>
                        </HeaderNavigation>
                    </Header>
                    <Body>
                        <BodyWrapper>
                            <Board>
                                <BoardTable>
                                    <thead>
                                    <BoardTableHeadRow>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Owner</th>
                                        <th>Key</th>
                                        <th>Category</th>
                                    </BoardTableHeadRow>
                                    </thead>
                                    <tbody>
                                    {board.slice(tablePage.page * tablePage.amount, (tablePage.page + 1) * tablePage.amount).map((item, i) => {
                                        return <BoardTableBodyRow key={i}
                                                                  onClick={() => (customHistory.push('/tasks'))}>
                                            <TdImage><Image src={item.icon.value}/></TdImage>
                                            <td style={{width: '300px'}}>{item.title}</td>
                                            <td style={{width: '120px'}}>{item.owner.name}</td>
                                            <td style={{width: '100px'}}>{item.key}</td>
                                            <td style={{width: '200px'}}>{item.category.value}</td>
                                        </BoardTableBodyRow>
                                    })}
                                    </tbody>
                                </BoardTable>
                                <BoardButtons>
                                    <ButtonJS children={coord.x} onClick={() => {
                                        setCoord({x: coord.x + 1});
                                    }}/>
                                    <ButtonAddField onClick={() => customHistory.push('/createBoard')}>
                                        Add field
                                        <SvgButton className='svg' viewBox='0 0 150 50' xmlns='http://www.w3.org/2000/svg'>
                                            <Rectangle className='rectangle' x='0' y='0' fill='none' width='150' height='50'/>
                                        </SvgButton>
                                    </ButtonAddField>
                                    <ButtonPreviousNextWrapper>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.max(tablePage.page - 1, 0)
                                            })
                                        }}>
                                            <SvgPreviousWrapper>{nextPreviousIcon()}</SvgPreviousWrapper>
                                            <TextPrevious>Previous</TextPrevious>
                                            <SvgButton className='svg' viewBox='0 0 150 50' xmlns='http://www.w3.org/2000/svg'>
                                                <Rectangle className='rectangle' x='0' y='0' fill='none' width='150' height='50'/>
                                            </SvgButton>
                                        </ButtonPreviousNext>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.min(tablePage.page + 1, Math.floor(board.length / 5))
                                            })
                                        }}>
                                            <TextNext>Next</TextNext>
                                            <SvgNextWrapper>{nextPreviousIcon()}</SvgNextWrapper>
                                            <SvgButton className='svg' viewBox='0 0 150 50' xmlns='http://www.w3.org/2000/svg'>
                                                <Rectangle className='rectangle' x='0' y='0' fill='none' width='150' height='50'/>
                                            </SvgButton>
                                        </ButtonPreviousNext>
                                    </ButtonPreviousNextWrapper>
                                </BoardButtons>
                            </Board>
                            <ErrorWrapper>{error && <ErrorMessage/>}</ErrorWrapper>
                        </BodyWrapper>
                    </Body>
                    <FooterWrap><Footer/></FooterWrap>
                </div>
            }
        </div>
    );
};

export default Dashboard;
