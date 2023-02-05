import axios from "axios";
export const access_token = localStorage.getItem("access_token");

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json ",
    Authorization: `Bearer ${access_token}`,
  },
});

export const getTodos = async (setTodoLists) => {
  try {
    const res = await API.get("/todos");
    setTodoLists(res.data);
  } catch (error) {
    throw new Error(error);
  }
};

export const postTodos = async (todo, setTodoLists, setTodoInput) => {
  // const access_token = localStorage.getItem("access_token");
  try {
    await API.post("/todos", {
      todo: todo,
    });
    setTodoInput("");
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

export const putTodos = async (id, modifyInput, checked, setTodoLists) => {
  try {
    await API.put(`todos/${id}`, {
      todo: modifyInput,
      isCompleted: checked,
    });
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodos = async (id, setTodoLists) => {
  try {
    await API.delete(`/todos/${id}`);
    alert("삭제되었습니다");
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

// {
//   headers: {
//     Authorization: `Bearer ${access_token}`,
//   },
// }
