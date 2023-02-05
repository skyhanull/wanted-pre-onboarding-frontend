import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./SignStyle";
import { SignApi } from "../apis/Sign";

const Signin = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // const [emailErr, setEmailErr] = useState(false);

  const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");
  const passwordreg = /^.{8,}$/;

  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, [access_token]);

  // useEffect(() => {
  //   if (!emailInput.includes("@") || !passwordreg.test(passwordInput)) {
  //     setEmailErr(true);
  //   } else {
  //     setEmailErr(false);
  //   }
  // }, [emailInput, passwordInput]);

  // const emailChangeHandler = (e) => {
  //   setEmailInput(e.target.value);
  // };

  // const passwordChangeHandler = (e) => {
  //   setPasswordInput(e.target.value);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   SignApi("signin", emailInput, passwordInput)
  //     .then((res) => {
  //       alert("로그인에 성공하셨습니다");
  //       const access_token = res.data.access_token;
  //       localStorage.setItem("access_token", access_token);
  //       navigate("/todo");
  //     })
  //     .catch((error) => {
  //       alert("로그인에 실패하셨습니다");
  //       throw new Error(error);
  //     });
  // };

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

  return (
    <div>
      <h1>로그인</h1>
      <S.SignBackground>
        <S.SignupContent onSubmit={submitHandler}>
          <S.SignInput
            type="text"
            data-testid="email-input"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          ></S.SignInput>
          <S.SignInput
            type="password"
            data-testid="password-input"
            placeholder="Password"
            autoComplete="off"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          ></S.SignInput>
          <S.SignBtn
            type="submit"
            disabled={
              !emailInput.includes("@") || !passwordreg.test(passwordInput)
            }
            data-testid="signin-button"
          >
            Login
          </S.SignBtn>
        </S.SignupContent>
        <S.RouterLink>
          <Link to="/signup">
            <span>회원가입을 원하신다면?</span>
          </Link>
          <Link to="/">
            <span>홈으로 돌아가길 원하신다면?</span>
          </Link>
        </S.RouterLink>
      </S.SignBackground>
    </div>
  );
};

export default Signin;
