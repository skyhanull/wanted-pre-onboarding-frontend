import { Link } from "react-router-dom";
import styled from "styled-components";

const MainBtn = styled.button`
  width: 30rem;
  height: 10rem;
  background-color: rgba(186, 232, 242, 0.6);
  font-size: 40px;
  margin: 20rem 1rem 1rem 7rem;
  border: none;
  border-radius: 20px;

  &:hover {
    background-color: rgba(36, 125, 194, 0.67);
  }
`;

const Mainpage = () => {
  return (
    <div>
      <Link to="/signup">
        <MainBtn>signup</MainBtn>
      </Link>

      <Link to="/signin">
        <MainBtn>signin</MainBtn>
      </Link>

      <Link to="/todo">
        <MainBtn>todolist</MainBtn>
      </Link>
    </div>
  );
};

export default Mainpage;
