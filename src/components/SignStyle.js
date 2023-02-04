import styled from "styled-components";

export const SignContent = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignBackground = styled.main`
  width: 30rem;
  height: 20rem;
  background-color: rgba(186, 232, 242, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
export const SignupContent = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SignInput = styled.input`
  border-radius: 10px;
  border: blue;
  width: 15rem;
  height: 3rem;
  margin: 1rem;
  font-size: 20px;
`;

export const SignBtn = styled.button`
  width: 15rem;
  height: 2rem;
  margin: 1rem;
  border-radius: 10px;

  &:disabled {
    background-color: orange;
    cursor: not-allowed;
  }
`;
