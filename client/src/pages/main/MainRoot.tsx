import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

const MainRoot: React.FC = () => {
  return (
    <>
      <h1>Hello!</h1>
      <div className="flex gap-2 items-center">
        <Link to={'/login'}><Button>LogIn</Button></Link>
        <Link to={'/signup'}><Button>SignUp</Button></Link>
      </div>
    </>
  )
};

export default MainRoot;
