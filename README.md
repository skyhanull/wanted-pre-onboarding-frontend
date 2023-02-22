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

<h2>Assignment 1</h2>

*  회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

```
//signup.js  + signin.js

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
<h2>Assignment 2</h2>

* 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요

```
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await SignApi("signup", emailInput, passwordInput);
      navigate("/signin"); //요청 성공시에 navigate를 이용하여 /signin으로 이동
    } catch (error) {
      alert("회원가입에 실패하셨습니다");
      throw new Error(error);
    }
  };
```

<h2>Assignment 3</h2>

* 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요

```
//signin.js

 const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await SignApi("signin", emailInput, passwordInput);
      const access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token); //localstorge에 저장 
      navigate("/todo"); // 요청 성공시에 navigate를 이용하여 /todo으로 이동
    } catch (error) {
      alert("로그인에 실패하셨습니다");
      throw new Error(error);
    }
  };
```
<h2>Assignment 4</h2>

* 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
* 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
* 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요

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

<h2>Assignment 5</h2>

* /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
* 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
* TODO의 완료 여부는 <input type="checkbox" />를 통해 표현해주세요
* TODO는 <li> tag를 이용해 감싸주세요
 
```
 /Todolist.js
 
  useEffect(() => {.  //useEffect로 접속시 바로 리스트 목록이 보이게 구현
    if (!access_token) {
      navigate("/signin");
    } else {
      getTodos(setTodoLists);
    }
  }, []);
  
 
 //TodoApi.js  => todo리스트의 api를 모아논 곳
 
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
    throw new Error(error); //에러가 나오게 구현
  }
};

```

 <h2>Assignment 6</h2>
 
* 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요

* TODO 입력 input에는 data-testid="new-todo-input" 속성을 부여해주세요

* TODO 추가 button에는 data-testid="new-todo-add-button" 속성을 부여해주세요

```
 //TodoList.js
 
  const PostHandler = (e) => {
    e.preventDefault();
    postTodos(todoInput, setTodoLists, setTodoInput); //클릭시 추가하는 함수 
  };

  
  <TodoContent>
        <TodoInput  // 새로운 todo 입력 가능한 input
          type="text"
          data-testid="new-todo-input"
          onChange={TodoInputHandler}
          value={todoInput}
        />
        <TodoAddBtn //추가하는 
          type="submit"
          data-testid="new-todo-add-button"
          onClick={PostHandler}
        >
          추가
        </TodoAddBtn>
      </TodoContent>
 
 
 //TodoApi.js
 
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
    setTodoInput(""); //입력 후 빈칸으로
    getTodos(setTodoLists);
  } catch (error) {
    throw new Error(error);
  }
};

```

 <h2>Assignment 7</h2>
 
* TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
 
```
 const checkedHandler = (event) => {
    setCkecked(!isCompleted);
    if (modify !== true) { //만약 수정버튼을 누른상태거 아닐때 체크박스 버튼으로만 수정유무 변겅 
      putTodos(id, todo, event.target.checked, setTodoLists);
    }
  };
 
 ...(중략)
 
  <input type="checkbox" checked={checked} onChange={checkedHandler} />
  
 
 // TodoApi.js
 
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

 <h2>Assignment 8 + 9 + 10</h2>
 
* TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

* 수정 버튼에는 data-testid="modify-button" 속성을 부여해주세요

* 삭제 버튼에는 data-testid="delete-button" 속성을 부여해주세요
 
* TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
* 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요

* 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 구
 
 * 투두 리스트의 삭제 기능을 구현해주세요

* 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요
```
 
 
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
    putTodos(id, modifyInput, checked, setTodoLists); //수정 버튼을 누를시 수정 함수 실행
    setModify(false); // 수정이 끝나면 수정상태 
  };

  const deleteHandler = (e) => {  
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      deleteTodos(id, setTodoLists); //확인을 누를시 삭제함수 실행
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
              defaultValue={todo} // 수정취소를 누른 후 다시 수정을 눌렀을 때 기존 todo리스트의 목록이 보이도록 구현 = 즉 수정했던 내용 초기화
              onChange={(e) => setModifyInput(e.target.value)}
            ></input>
            <button
              type="submit"
              onClick={updateHandler} //todo 수정한 것을 제출하는 버튼
              data-testid="submit-button"
            >
              제출
            </button>
            <button
              type="button"
              onClick={modifyBtn} // 수정한 내용을 초기화  + todo 수정상태 취소버튼
              data-testid="cancel-button"
            >
              취소
            </button>
          </div>
        ) : (
          <div>
            <ListSpace>{todo}</ListSpace>
            <button 
              data-testid="modify-button"  //todo 수정상태로 들어가는 버튼
              type="button"
              onClick={modifyBtn} // 수정 버튼을 누르면 수정모드가 활성화 
            >
              수정
            </button>
            <button  
              data-testid="delete-button"  //todo 삭제 버튼
              type="submit"
              onClick={deleteHandler}
            >
              삭제
            </button>
          </div>
        )}
     
     
     
   // TodoApi.js
     
export const deleteTodos = async (id, setTodoLists) => {
  const access_token = localStorage.getItem("access_token");
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
```

<h2>사용한 라이브러리</h2>



react-router-dom

axios

styled-components
