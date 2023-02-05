import styled from "styled-components";

export const SignContent = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignBackground = styled.main`
  width: 25rem;
  height: 20rem;
  background-color: rgba(186, 232, 242, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;
export const SignupContent = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SignInput = styled.input`
  border-radius: 10px;
  border: blue;
  height: 2rem;
  margin: 1rem;
  font-size: 20px;
`;

export const SignBtn = styled.button`
  width: 20rem;
  height: 2rem;
  margin: 1rem;
  border-radius: 10px;
  border: none;
  background-color: rgba(108, 176, 228, 0.99);

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

export const RouterLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & :link {
    display: flex;
    margin-top: 1rem;
    justify-content: center;
  }
`;
