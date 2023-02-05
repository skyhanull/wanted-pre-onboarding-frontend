import styled from "styled-components";
import { useState } from "react";
import { putTodos, deleteTodos } from "../../apis/TodoApi";

const TodosList = styled.li`
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

const LabelContent = styled.label`
  display: flex;
  flex-wrap: nowrap;
  margin: 1rem;
`;

const ListSpace = styled.span`
  margin: 0 1rem 0 1rem;
`;

const Todos = ({ data, setTodoLists }) => {
  const { todo, isCompleted, id } = data;
  const [modify, setModify] = useState(false);
  const [modifyInput, setModifyInput] = useState("");
  const [checked, setCkecked] = useState(isCompleted);

  const modifyBtn = () => {
    setModify(!modify);
  };

  const checkedHandler = (event) => {
    setCkecked(!isCompleted);
    if (modify !== true) {
      putTodos(id, todo, event.target.checked, setTodoLists);
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    putTodos(id, modifyInput, checked, setTodoLists);
    setModifyInput("");
    setModify(false);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      deleteTodos(id, setTodoLists);
    }
  };

  return (
    <TodosList>
      <LabelContent>
        <input type="checkbox" checked={checked} onChange={checkedHandler} />
        {modify === true ? (
          <div>
            <input
              type="text"
              data-testid="modify-input"
              value={modifyInput}
              onChange={(e) => setModifyInput(e.target.value)}
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
            <ListSpace>{todo}</ListSpace>
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
      </LabelContent>
    </TodosList>
  );
};

export default Todos;
