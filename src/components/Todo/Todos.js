import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

const TodosList = styled.li`
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

const AAA = styled.label`
  display: flex;
  flex-wrap: nowrap;
  margin: 1rem;
`;

const Todos = ({ data, getTodos }) => {
  const { todo, isCompleted, id } = data;
  const [modify, setModify] = useState(false);
  const [modifyInput, setModifyInput] = useState("");
  const [checked, setCkecked] = useState(isCompleted);
  const access_token = localStorage.getItem("access_token");
  const BASE_URL = process.env.REACT_APP_API_URL;

  const modifyHandler = (e) => {
    setModifyInput(e.target.value);
  };

  const modifyBtn = () => {
    setModify(!modify);
  };

  const checkedHandler = (event) => {
    setCkecked(!isCompleted);
    if (modify !== true) {
      updateTodoList(event.target.checked, id, todo);
    }
  };

  const updateTodoList = (checked, id, modifyInput) => {
    axios({
      method: "put",
      url: `${BASE_URL}/todos/${id}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/json",
      },
      data: {
        todo: modifyInput,
        isCompleted: checked,
      },
    }).then(() => {
      alert("수정되었습니다");
      getTodos();
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    updateTodoList(checked, id, modifyInput);
    setModify(false);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    axios({
      method: "delete",
      url: `${BASE_URL}/todos/${id}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(() => {
      alert("삭제되었습니다");
      getTodos();
    });
  };

  return (
    <TodosList>
      <AAA>
        <input type="checkbox" checked={checked} onChange={checkedHandler} />
        {modify === true ? (
          <div>
            <input
              type="text"
              data-testid="modify-input"
              onChange={modifyHandler}
            ></input>
            <button
              type="submit"
              onClick={updateHandler}
              data-testid="submit-button"
            >
              제출
            </button>
            <button
              type="button"
              onClick={modifyBtn}
              data-testid="cancel-button"
            >
              취소
            </button>
          </div>
        ) : (
          <div>
            <span>{todo}</span>
            <button
              data-testid="modify-button"
              type="button"
              onClick={modifyBtn}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              type="submit"
              onClick={deleteHandler}
            >
              삭제
            </button>
          </div>
        )}
      </AAA>
    </TodosList>
  );
};

export default Todos;
