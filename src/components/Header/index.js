import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin";
import { DataContext } from "../../App";
import Cookies from "js-cookie";


const Header = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const dataLogin = useContext(DataContext);
  const navigate = useNavigate();


  const handleShowModalLogin = () => setShowModalLogin(true);
  const handleCloseModalLogin = () => setShowModalLogin(false);

  const titleStyle = {
    color: "black",
    fontWeight: "bolder",
    textAlign: "center",
    margin: 0,
    fontSize: "25px",
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    dataLogin.setIsLogin(false);
    navigate("/");
  };


  return (
  <div className="header">
    <ModalLogin show={showModalLogin} handleClose={handleCloseModalLogin} />

    <h1 style={titleStyle}>Notes App</h1>
    <div>
      <Link to="/">
        <span className="mx-3">Home</span>
      </Link>

      {dataLogin.isLogin ? (
        <>
          <Link to="/archives">
            <span>Archives</span>
          </Link>
          <span onClick={handleLogout} className="mx-3">
            Logout
          </span>
        </>
      ) : (
        <span onClick={handleShowModalLogin}>Login</span>
      )}
    </div>
  </div>
  );
};

export default Header;
