import React from "react";
import {Preloader} from "../Preloader/Preloader";
import {customHistory} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {Header, HeaderNav, HeaderNavItem} from "../../styledComponents/Header";
import {Body} from "../../styledComponents/Body";
import Footer from "../../styledComponents/Footer";
import {localStorageRemoveItemRequest} from "../../reducers/auth";
import styled, {keyframes} from "styled-components";
import {Title} from "../../styledComponents/Title";
import AddTaskIcon from "../../svg/AddTaskIcon";

export const animateAddTask = keyframes`
    from {
    }

    to {
        box-shadow: 0 0 10px #43a047, 0 0 40px #43a047, 0 0 80px #43a047;
        fill: #43a047;
        stroke: #43a047;
    }
`;

const BodyTasks = styled(Body)`
    flex-direction: row;
`;

const LeftBodyWrapper = styled.div`
    width: 30vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 70px;
`;

const RightBodyWrapper = styled.div`
    width: 70vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const DragAndDropTasks = styled.div`
    width: 100%;
`;

const VerticalColumnTasks = styled.div`
    height: 100%;
    width: 100%;
    padding-left 30px;
`;

const Task = styled.div`
    padding: 30px 0px 10px 0;
    border-bottom: 2px black solid;
`;

const TitleTaskList = styled(Title)`
    padding: 30px 30px 0px 30px;
`;

const SvgAddTaskWrapper = styled(Title)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const MainTaskItem = styled.div`
    width: 500px;
    height: 200px;
`;

const AddTask = styled(AddTaskIcon)`
    transition: 0.6s
    :hover {
        cursor: pointer;
        animation: ${animateAddTask} .5s ease-in-out;
        animation-fill-mode: forwards;
    }
`;

const Tasks = () => {
    const loader = useSelector(state => state.auth.loader);
    const tasks = useSelector(state => state.tasks.tasksOfBoard);
    const dispatch = useDispatch();

    const onDragEnd = () => {

    }

    return (
        <div>
            {(loader === true) ?
                <Preloader/> :
                <div>
                    <Header>
                        <h1>MiniJira</h1>
                        <HeaderNav>
                            <HeaderNavItem onClick={() => {
                                customHistory.push('/dashboard');
                            }}>
                                Back
                            </HeaderNavItem>
                            <HeaderNavItem onClick={() => dispatch(localStorageRemoveItemRequest({key: 'TOKEN'}))}>
                                Log Out
                            </HeaderNavItem>
                        </HeaderNav>
                    </Header>
                    <BodyTasks>
                        <LeftBodyWrapper>
                            <TitleTaskList>
                                Task List
                            </TitleTaskList>
                            <DragAndDropTasks onDragEnd={onDragEnd}>
                                <VerticalColumnTasks>
                                    {tasks.map((item) => {
                                        return <Task>{item.title}</Task>
                                    })}
                                </VerticalColumnTasks>
                            </DragAndDropTasks>
                            <SvgAddTaskWrapper>
                                <AddTask/>
                            </SvgAddTaskWrapper>
                        </LeftBodyWrapper>
                        <RightBodyWrapper>
                            <TitleTaskList>
                                Main Task
                            </TitleTaskList>
                            <MainTaskItem>

                            </MainTaskItem>
                            <MainTaskItem>

                            </MainTaskItem>
                            <MainTaskItem>

                            </MainTaskItem>
                            <MainTaskItem>

                            </MainTaskItem>
                            <MainTaskItem>

                            </MainTaskItem>
                        </RightBodyWrapper>
                    </BodyTasks>
                    <Footer>
                        Made by Kazakov Alexander
                    </Footer>
                </div>
            }
        </div>
    );
}

export default Tasks;
