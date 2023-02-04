import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./SignStyle";

const Signin = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  const access_token = localStorage.getItem("access_token");
  const passwordreg = /^.{8,}$/;

  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, []);

  useEffect(() => {
    if (!emailInput.includes("@") || !passwordreg.test(passwordInput)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  }, [emailInput, passwordInput]);

  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${BASE_URL}/auth/signin`,
      data: {
        email: emailInput,
        password: passwordInput,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const access_token = res.data.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/todo");
      })
      .catch((error) => {
        throw new Error(error);
      });
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
            onChange={emailChangeHandler}
          ></S.SignInput>
          <S.SignInput
            type="password"
            data-testid="password-input"
            placeholder="Password"
            autoComplete="off"
            onChange={passwordChangeHandler}
          ></S.SignInput>
          <S.SignBtn
            type="submit"
            disabled={emailErr ? true : false}
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
