import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderLine = styled.header`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const MainBtn = styled.button`
  width: 7rem;
  height: 3rem;
  margin: 1rem;
  background-color: rgba(186, 232, 242, 0.6);
  border-radius: 20px;
  font-size: 20px;

  &:hover {
    background-color: rgba(36, 125, 194, 0.67);
  }
`;

const Header = () => {
  return (
    <HeaderLine>
      <Link to="/signup">
        <MainBtn>signup</MainBtn>
      </Link>
      <Link to="/signin">
        <MainBtn>signin</MainBtn>
      </Link>
      <Link to="/todo">
        <MainBtn>todo</MainBtn>
      </Link>
    </HeaderLine>
  );
};

export default Header;
