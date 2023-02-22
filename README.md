<h1>wanted-pre-onboarding-frontend</h1>
원티드 프리온보딩 프론트엔드 인턴쉽 선발과제</br></br>

<h2>프로젝트 실행 방법</h2>



본 프로젝트를 클론 받아 아래 명령어로 앱을 실행할 수 있습니다.</br>
```
 https://github.com/skyhanull/wanted-pre-onboarding-frontend.git
 npm install
 npm start
```
env파일 생성
```
REACT_APP_API_URL="https://pre-onboarding-selection-task.shop"
```

</br>
<h2>배포</h2>



[배포링크](https://wanted-pre-onboarding-frontend-inky.vercel.app/todo)

</br>

<h2>시연영상</h2>
<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">       

![Feb-05-2023 23-37-48](https://user-images.githubusercontent.com/106054006/216826123-27c5b053-23b5-4827-ad80-98e7e7c0e28d.gif)


![Feb-05-2023 23-38-40](https://user-images.githubusercontent.com/106054006/216826091-e09e4c18-59b4-462e-8c83-3f0c9ffc998b.gif)


</div>
</details>


<h2>요구사항 구현</h2>

1. 로그인/회원가입

Assignment 1
회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
```
//signup.js 

 <S.SignBtn
            type="submit"
            disabled={
              !emailInput.includes("@") || !passwordreg.test(passwordInput) //disabled속성에 두개의 조건을 주고 참이 아닐때만 속성이 작동하게 구현
            }
            data-testid="signup-button"
          >
            Signup
          </S.SignBtn>

```
Assignment 2
회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요
```
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await SignApi("signup", emailInput, passwordInput);
      navigate("/signin");
    } catch (error) {
      alert("회원가입에 실패하셨습니다");
      throw new Error(error);
    }
  };
```

Assignment 3
로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요
```
//signin.js

 const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await SignApi("signin", emailInput, passwordInput);
      const access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token);
      navigate("/todo");
    } catch (error) {
      alert("로그인에 실패하셨습니다");
      throw new Error(error);
    }
  };
```
Assignment 4
로그인 여부에 따른 리다이렉트 처리를 구현해주세요
로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요
```
 useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, [access_token]);
  
  
    useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    } else {
      getTodos(setTodoLists);
    }
  }, []);
```

Assignment 5
/todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
TODO의 완료 여부는 <input type="checkbox" />를 통해 표현해주세요
TODO는 <li> tag를 이용해 감싸주세요
```
  useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    } else {
      getTodos(setTodoLists);
    }
  }, []);
  
  export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json ",
  },
});

export const getTodos = async (setTodoLists) => {
  const access_token = localStorage.getItem("access_token");
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

```

Assignment 6
리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요

TODO 입력 input에는 data-testid="new-todo-input" 속성을 부여해주세요

TODO 추가 button에는 data-testid="new-todo-add-button" 속성을 부여해주세요

```
export const postTodos = async (todo, setTodoLists, setTodoInput) => {
  const access_token = localStorage.getItem("access_token");
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

export const postTodos = async (todo, setTodoLists, setTodoInput) => {
  const access_token = localStorage.getItem("access_token");
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

```

Assignment 7
TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
```
 const checkedHandler = (event) => {
    setCkecked(!isCompleted);
    if (modify !== true) {
      putTodos(id, todo, event.target.checked, setTodoLists);
    }
  };
  
  export const putTodos = async (id, modifyInput, checked, setTodoLists) => {
  const access_token = localStorage.getItem("access_token");
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
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};
```

Assignment 8
TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

수정 버튼에는 data-testid="modify-button" 속성을 부여해주세요

삭제 버튼에는 data-testid="delete-button" 속성을 부여해주세요
```
 return (
    <TodosList>
      <LabelContent>
        <input type="checkbox" checked={checked} onChange={checkedHandler} />
        {modify === true ? (
          <div>
            <input
              type="text"
              data-testid="modify-input"
              defaultValue={todo}
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
```

<h2>사용한 라이브러리</h2>



react-router-dom

axios

styled-components
