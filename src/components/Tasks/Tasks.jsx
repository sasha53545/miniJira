import React, {useEffect, useState} from "react";
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
import {animateInputTask} from "../../styledComponents/AnimateInputTask";

import {
  createTaskAction,
  taskOfBoardPost,
  tasksGetRequest,
  tasksPostRequest
} from "../../reducers/tasks";

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
    padding: 70px 0 0 30px;
`;

const RightBodyWrapper = styled.div`
    width: 70vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 70px 0 100px 30px;
`;

const DragAndDropTasks = styled.div`
    width: 100%;
    height: 100%;
`;

const VerticalColumnTasks = styled.div`
    height: 100%;
    width: 100%;
`;

const Task = styled.div`
    padding: 30px 0px 10px 0;
    border-bottom: 2px black solid;
`;

const TitleTaskList = styled(Title)`
    padding: 30px 30px 0px 0;
`;

const SvgAddTaskWrapper = styled(Title)`
    position: relative;
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 50%;
`;

const AddShadow = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    transition: 0.9s;
    background-color: transparent;
    border-radius: 50%;
    width: 62px;
    height: 62px;
`;

const MainTaskItem = styled.div`
    width: 500px;
    height: 70px;
    border: 2px black solid;
`;

const AddTask = styled(AddTaskIcon)`
    transition: 0.6s
    :hover {
        cursor: pointer;
        animation: ${animateAddTask} .5s ease-in-out;
        animation-fill-mode: forwards;
    }
    border-radius: 50%;
`;

const ListTasksWrapper = styled.div`

`;

const AddTaskWrapper = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px 0 0 0;
`;

const AddTaskInput = styled.input` 
  animation: ${animateInputTask} 1s; 
  padding: 0 0 0 15px;  
  width: 100%;
  height: 40px;
  margin: 0 0 20px 0;
`;

const AddTaskButtonsWrapper = styled.div` 

`;

const AddTaskButton = styled.button` 

`;

const Tasks = () => {
  const loader = useSelector(state => state.auth.loader);
  const tasks = useSelector(state => state.tasks.data);
  const tasksID = useSelector(state => state.tasks.tasksID);
  const tasksOfBoard = useSelector(state => state.tasks.tasksOfBoard);
  const dataLocalstorage = useSelector(state => state.auth.localstorage.data);
  const dispatch = useDispatch();

  const [addTask, setAddTask] = useState(false);
  const [formPost, setFormPost] = useState({
    title: '',
    boardId: tasksID,
    description: "",
    parentTaskId: ""
  });

  const onDragEnd = () => {

  };

  const onChange = (event) => {
    if (event) {
      event.preventDefault();
    }

    setFormPost({
      ...formPost,
      title: event.target.value
    });
  };

  const clickHandler = () => {
      // await dispatch(tasksPostRequest({token: dataLocalstorage, form: formPost, tasks: tasks}));
      // await dispatch(tasksGetRequest());
      dispatch(createTaskAction({token: dataLocalstorage, form: formPost, tasks: tasks}));

    formPost.title = '';
  };

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
              <ListTasksWrapper>
                <TitleTaskList>
                  Task List
                </TitleTaskList>
                <DragAndDropTasks onDragEnd={onDragEnd}>
                  <VerticalColumnTasks>
                    {tasksOfBoard.map((item) => {
                      return <Task>{item.title}</Task>
                    })}
                  </VerticalColumnTasks>
                </DragAndDropTasks>
              </ListTasksWrapper>
              <AddTaskWrapper>
                {addTask && <AddTaskInput type="text" name='task' value={formPost.title} onChange={onChange}
                                          placeholder="Введите название задачи"/>}
                <SvgAddTaskWrapper onClick={() => {
                  clickHandler();
                  setAddTask(true);
                }}>
                  <AddShadow></AddShadow>
                  <AddTask/>
                </SvgAddTaskWrapper>
                {<AddTaskButtonsWrapper>
                  <AddTaskButton/>
                  <AddTaskButton/>
                </AddTaskButtonsWrapper>}
              </AddTaskWrapper>
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
            </RightBodyWrapper>
          </BodyTasks>
          <Footer>
            Made by Kazakov Alexander
          </Footer>
        </div>
      }
    </div>
  );
};

export default Tasks;
