import axios from "axios";
import { useEffect, useState } from "react";
import Todos from "./Todos";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TodoListBackground = styled.div`
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

const TodoContent = styled.div`
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

const ListBody = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
`;

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const access_token = localStorage.getItem("access_token");

  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    } else {
      getTodos();
    }
  }, []);

  const TodoInputHandler = (e) => {
    setTodoInput(e.target.value);
  };

  const getTodos = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/todos`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => setTodoLists(res.data))
      .catch((error) => {
        throw new Error(error);
      });
  };

  const ViewHandler = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/todos`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/json",
      },
      data: {
        todo: todoInput,
      },
    })
      .then(() => {
        setTodoInput("");
        getTodos();
      })
      .catch((error) => {
        throw new Error(error);
      });
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
        <TodoAddBtn data-testid="new-todo-add-button" onClick={ViewHandler}>
          추가
        </TodoAddBtn>
      </TodoContent>
      <ListBody>
        {todoLists &&
          todoLists.map((el) => (
            <Todos key={el.id} data={el} getTodos={getTodos}></Todos>
          ))}
      </ListBody>
    </TodoListBackground>
  );
};

export default TodoList;
