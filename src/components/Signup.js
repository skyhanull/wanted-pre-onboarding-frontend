import { useEffect, useState } from "react";
import * as S from "./SignStyle";
import { Link, useNavigate } from "react-router-dom";
import { SignApi } from "../apis/Sign";

const Signup = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // const [errMessage, setErrMessage] = useState(false);

  const access_token = localStorage.getItem("access_token");
  const passwordreg = /^.{8,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, [access_token]);

  // useEffect(() => {
  //   if (!emailInput.includes("@") || !passwordreg.test(passwordInput)) {
  //     setErrMessage(true);
  //   } else {
  //     setErrMessage(false);
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
  //   SignApi("signup", emailInput, passwordInput)
  //     .then(() => {
  //       alert("회원가입에 성공하셨습니다");
  //       navigate("/signin");
  //     })
  //     .catch((error) => {
  //       alert("회원가입에 실패하셨습니다");
  //       throw new Error(error);
  //     });
  // };

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

  return (
    <div>
      <h1>회원가입</h1>
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
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoComplete="off"
          ></S.SignInput>
          <S.SignBtn
            type="submit"
            disabled={
              !emailInput.includes("@") || !passwordreg.test(passwordInput)
            }
            data-testid="signup-button"
          >
            Signup
          </S.SignBtn>
        </S.SignupContent>
        <S.RouterLink>
          <Link to="/signin">
            <span>로그인을 원하신다면?</span>
          </Link>
          <Link to="/">
            <span>홈으로 돌아가길 원하신다면?</span>
          </Link>
        </S.RouterLink>
      </S.SignBackground>
    </div>
  );
};

export default Signup;
