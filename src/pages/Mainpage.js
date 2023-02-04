import { Link } from "react-router-dom";

const Mainpage = () => {
  return (
    <div>
      <button>
        <Link to="/signup">메인</Link>
      </button>
      <button>
        <Link to="/signin">메인</Link>
      </button>
    </div>
  );
};

export default Mainpage;
