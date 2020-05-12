import React, {useEffect, useState} from "react";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {boardGetRequest} from "../../reducers/board";
import {localStorageRemoveItemRequest} from "../../reducers/auth";
import styled from "styled-components";
import nextPreviousIcon from "../../svg/NextPreviousIcon";
import Button, {animateHoverButton, SvgButton} from "../../styledComponents/Button";
import Footer from "../../styledComponents/Footer";
import {Header, HeaderNav, HeaderNavItem} from "../../styledComponents/Header";
import {Body, BodyWrapperTable, TableWrapper} from "../../styledComponents/Body";
import {Table, TableBodyRow, TableHeadRow, TableImage, TableImageWrapper} from "../../styledComponents/Table";
import {tasksGetRequest, tasksOfBoardGet} from "../../reducers/tasks";

const BoardButtons = styled.div`
    position: absolute;
    bottom: 0;
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const NextPreviousIcon = styled(nextPreviousIcon)`
    ${Button}:hover & {
        animation: ${animateHoverButton} .6s ease-in-out 0.6s;
        animation-fill-mode: forwards;
    }
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
        animation: ${animateHoverButton} .6s ease-in-out 0.6s;
        animation-fill-mode: forwards;
    }
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

const Dashboard = () => {
    const board = useSelector(state => state.board.data);
    const tasks = useSelector(state => state.tasks.data);
    const loader = useSelector(state => state.board.loader);
    const error = useSelector(state => state.board.error);
    const dispatch = useDispatch();

    const [tablePage, setTablePage] = useState({
        page: 0,
        amount: 5
    });

    useEffect(() => {
        dispatch(boardGetRequest());
        dispatch(tasksGetRequest());
    }, []);

    return (
        <div>
            {(loader === true) ?
                <Preloader/> :
                <div>
                    <Header>
                        <h1>MiniJira</h1>
                        <HeaderNav>
                            <HeaderNavItem onClick={() => dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}))}>
                                Log Out
                            </HeaderNavItem>
                        </HeaderNav>
                    </Header>
                    <Body>
                        <BodyWrapperTable>
                            <TableWrapper>
                                <Table>
                                    <thead>
                                    <TableHeadRow>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Owner</th>
                                        <th>Key</th>
                                        <th>Category</th>
                                    </TableHeadRow>
                                    </thead>
                                    <tbody>
                                    {board.slice(tablePage.page * tablePage.amount, (tablePage.page + 1) * tablePage.amount).map((item, i) => {
                                        return <TableBodyRow key={i}
                                                             onClick={() => {
                                                                 const tasksToDispatch = [];
                                                                 tasks.map((task) => {
                                                                     if(task.board === item._id) {
                                                                         tasksToDispatch.push(task);
                                                                     }
                                                                 });
                                                                 dispatch(tasksOfBoardGet({tasks: tasksToDispatch}));
                                                                 customHistory.push('/tasks');
                                                             }}>
                                            <TableImageWrapper><TableImage src={item.icon.value}/></TableImageWrapper>
                                            <td style={{width: '300px'}}>{item.title}</td>
                                            <td style={{width: '120px'}}>{item.owner.name}</td>
                                            <td style={{width: '100px'}}>{item.key}</td>
                                            <td style={{width: '200px'}}>{item.category.value}</td>
                                        </TableBodyRow>
                                    })}
                                    </tbody>
                                </Table>
                                <BoardButtons>
                                    <Button onClick={() => customHistory.push('/createBoard')}>
                                        <SvgButton/>
                                        Add field
                                    </Button>
                                    <ButtonPreviousNextWrapper>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.max(tablePage.page - 1, 0)
                                            })
                                        }}>
                                            <SvgButton/>
                                            <SvgPreviousWrapper>
                                                <NextPreviousIcon/>
                                            </SvgPreviousWrapper>
                                            <TextPrevious>Previous</TextPrevious>
                                        </ButtonPreviousNext>
                                        <ButtonPreviousNext onClick={() => {
                                            setTablePage({
                                                ...tablePage,
                                                page: Math.min(tablePage.page + 1, Math.floor(board.length / 5))
                                            })
                                        }}>
                                            <SvgButton/>
                                            <TextNext>Next</TextNext>
                                            <SvgNextWrapper>
                                                <NextPreviousIcon/>
                                            </SvgNextWrapper>
                                        </ButtonPreviousNext>
                                    </ButtonPreviousNextWrapper>
                                </BoardButtons>
                            </TableWrapper>
                            {error && <ErrorMessage/>}
                        </BodyWrapperTable>
                    </Body>
                    <Footer>
                        Made by Kazakov Alexander
                    </Footer>
                </div>
            }
        </div>
    );
};

export default Dashboard;
