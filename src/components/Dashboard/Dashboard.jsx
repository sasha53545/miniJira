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

const Dashboard = () => {
    //----------STYLED_COMPONENTS-----------
    //---------------------------------------animation--
    const animate = keyframes`
        from {
        }

        to {
            background-color: gainsboro;
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
    }
`;

    const Button = styled.button`
    display: flex;
    align-items: center;
    width: 150px;
    height: 50px;
    box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.5);
    font-weight: 600;
`;

    const ButtonAddField = styled(Button)`
    justify-content: center;
`;

    const TextNext = styled.div`
    padding-left: 25px;
`;

    const TextPrevious = styled.div`
    padding-right: 25px;
`;

    const SvgNext = styled.div`
    transform: rotate(180deg);
`;

    const SvgPrevious = styled.div`
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

    //---------------------------------------body--
    const FooterWrap = styled.div`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    bottom: 0;
`;

    const board = useSelector(state => state.board.data);
    const loader = useSelector(state => state.board.loader);
    const error = useSelector(state => state.board.error);
    const dispatch = useDispatch();

    const [tablePage, setTablePage] = useState({
        page: 0,
        amount: 5
    });

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
                            <div onClick={() => {
                                dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}));
                            }}>
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
                                        return <BoardTableBodyRow
                                            key={i}
                                            onClick={() => (customHistory.push('/tasks'))}>
                                            <TdImage>
                                                <Image src={item.icon.value}/>
                                            </TdImage>
                                            <td style={{width: '300px'}}>{item.title}</td>
                                            <td style={{width: '120px'}}>{item.owner.name}</td>
                                            <td style={{width: '100px'}}>{item.key}</td>
                                            <td style={{width: '200px'}}>{item.category.value}</td>
                                        </BoardTableBodyRow>
                                    })}
                                    </tbody>
                                </BoardTable>

                                <BoardButtons>
                                    <ButtonAddField onClick={() => {
                                        customHistory.push('/createBoard');
                                    }}>
                                        Add field
                                    </ButtonAddField>
                                    <ButtonPreviousNextWrapper>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.max(tablePage.page - 1, 0)
                                            })
                                        }}>
                                            <SvgPrevious>
                                                {nextPreviousIcon()}
                                            </SvgPrevious>
                                            <TextPrevious>
                                                Previous
                                            </TextPrevious>
                                        </ButtonPreviousNext>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.min(tablePage.page + 1, Math.floor(board.length / 5))
                                            })
                                        }}>
                                            <TextNext>
                                                Next
                                            </TextNext>
                                            <SvgNext>
                                                {nextPreviousIcon()}
                                            </SvgNext>
                                        </ButtonPreviousNext>
                                    </ButtonPreviousNextWrapper>
                                </BoardButtons>
                            </Board>
                            <ErrorWrapper>
                                {error && <ErrorMessage/>}
                            </ErrorWrapper>
                        </BodyWrapper>
                    </Body>
                    <FooterWrap>
                        <Footer/>
                    </FooterWrap>
                </div>
            }
        </div>
    );
};

export default Dashboard;
