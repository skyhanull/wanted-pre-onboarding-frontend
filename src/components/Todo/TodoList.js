import axios from "axios";
import { useEffect, useState } from "react";
import Todos from "./Todos";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TodoInput = styled.input`
  width: 15rem;
  height: 2rem;
`;

const TodoAddBtn = styled.button`
  width: 3rem;
  height: 2rem;
`;

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const BASE_URL = "https://pre-onboarding-selection-task.shop";
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    }
  }, []);

  const TodoInputHandler = (e) => {
    setTodoInput(e.target.value);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/todos`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => {
      setTodoLists(res.data);
    });
  }, [todoLists]);

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
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <TodoInput
        type="text"
        data-testid="new-todo-input"
        onChange={TodoInputHandler}
      />
      <TodoAddBtn data-testid="new-todo-add-button" onClick={ViewHandler}>
        추가
      </TodoAddBtn>
      {todoLists.map((el) => (
        <Todos key={el.id} data={el}></Todos>
      ))}
    </div>
  );
};

export default TodoList;
