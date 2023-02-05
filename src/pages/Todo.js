import TodoList from "../components/Todo/TodoList";
import styled from "styled-components";

const TodoPage = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

const Todo = () => {
  return (
    <TodoPage>
      <TodoList />
    </TodoPage>
  );
};

export default Todo;
