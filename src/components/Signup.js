import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./SignStyle";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const BASE_URL = "https://pre-onboarding-selection-task.shop";
  const access_token = localStorage.getItem("access_token");
  const passwordreg = /^.{8,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, [access_token]);

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
      url: `${BASE_URL}/auth/signup`,
      data: {
        email: emailInput,
        password: passwordInput,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        navigate("/signin");
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
          data-testid="signup-button"
        >
          Signup
        </S.SignBtn>
      </S.SignupContent>
    </S.SignBackground>
  );
};

export default Signup;
