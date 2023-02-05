import axios from "axios";

//로그인,회원가입 api
export const SignApi = (pathname, email, password) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/auth/${pathname}`,
    data: {
      email: email,
      password: password,
    },
    headers: {
      "Content-type": "application/json",
    },
  });
};
