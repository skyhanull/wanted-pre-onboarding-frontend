import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "./SignStyle";

const Signin = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "https://pre-onboarding-selection-task.shop";
  console.log(BASE_URL);
  const access_token = localStorage.getItem("access_token");
  const passwordreg = /^.{8,}$/;

  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
    console.log(BASE_URL);
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
    <S.SignBackground>
      <S.SignupContent onSubmit={submitHandler}>
        <S.SignInput
          type="text"
          data-testid="email-input"
          placeholder="Email"
          onChange={emailChangeHandler}
        ></S.SignInput>
        <S.SignInput
          type="number"
          data-testid="password-input"
          placeholder="Password"
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
    </S.SignBackground>
  );
};

export default Signin;
