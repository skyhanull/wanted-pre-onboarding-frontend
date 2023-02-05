import { useEffect, useState } from "react";
import Todos from "./Todos";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTodos, postTodos } from "../../apis/TodoApi";

const TodoListBackground = styled.main`
  background-color: rgba(186, 232, 242, 0.6);
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-style: double;
  border-width: 1rem;
  border-color: rgba(36, 125, 194, 0.67);
`;

const TitleTodoList = styled.span`
  display: flex;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 5rem;
  font-weight: bold;
`;

const TodoContent = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`;

const TodoInput = styled.input`
  width: 15rem;
  height: 2rem;
`;

const TodoAddBtn = styled.button`
  width: 3rem;
  height: 2rem;
`;

const ListBody = styled.section`
  background-color: rgba(0, 0, 0, 0.3);
  overflow: scroll;
  height: 40rem;
`;

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    } else {
      getTodos(setTodoLists);
    }
  }, []);

  const TodoInputHandler = (e) => {
    setTodoInput(e.target.value);
  };

  const PostHandler = (e) => {
    e.preventDefault();
    postTodos(todoInput, setTodoLists, setTodoInput);
  };

  return (
    <TodoListBackground>
      <TitleTodoList>TODOLIST</TitleTodoList>
      <TodoContent>
        <TodoInput
          type="text"
          data-testid="new-todo-input"
          onChange={TodoInputHandler}
          value={todoInput}
        />
        <TodoAddBtn
          type="submit"
          data-testid="new-todo-add-button"
          onClick={PostHandler}
        >
          추가
        </TodoAddBtn>
      </TodoContent>
      <ListBody>
        {todoLists &&
          todoLists.map((el) => (
            <Todos key={el.id} data={el} setTodoLists={setTodoLists}></Todos>
          ))}
      </ListBody>
    </TodoListBackground>
  );
};

export default TodoList;
