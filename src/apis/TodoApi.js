import axios from "axios";
const access_token = localStorage.getItem("access_token");

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json ",
  },
});

export const getTodos = async (setTodoLists) => {
  try {
    const res = await API.get("/todos", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    setTodoLists(res.data);
  } catch (error) {
    throw new Error(error);
  }
};

export const postTodos = async (todo, setTodoLists, setTodoInput) => {
  try {
    await API.post(
      "/todos",
      {
        todo: todo,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setTodoInput("");
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

export const putTodos = async (id, modifyInput, checked, setTodoLists) => {
  try {
    await API.put(
      `todos/${id}`,
      {
        todo: modifyInput,
        isCompleted: checked,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    alert("수정되었습니다");
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodos = async (id, setTodoLists) => {
  try {
    await API.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    alert("삭제되었습니다");
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};
