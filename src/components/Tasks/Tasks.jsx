import React, {useState} from "react";
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
  width: 100%;
  height: 40px;
  margin: 0 0 15px 0;
  padding: 0 0 0 15px;
`;

const Tasks = () => {
  const [inputTask, setInputTask] = useState(false);
  const loader = useSelector(state => state.auth.loader);
  const tasks = useSelector(state => state.tasks.tasksOfBoard);
  const dispatch = useDispatch();

  const onDragEnd = () => {

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
                    {tasks.map((item) => {
                      return <Task>{item.title}</Task>
                    })}
                  </VerticalColumnTasks>
                </DragAndDropTasks>
              </ListTasksWrapper>
              <AddTaskWrapper>
                {inputTask && <AddTaskInput type="text" placeholder="Введите название задачи"/>}
                <SvgAddTaskWrapper onClick={() => setInputTask(true)}>
                  <AddShadow></AddShadow>
                  <AddTask/>
                </SvgAddTaskWrapper>
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
}

export default Tasks;
