import React, { useEffect, useState } from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import SalesList from "./pages/sales-list/SalesList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtUtils } from "./utils/JwtUtils";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/reducers/AuthReducer";

function App(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const logout = () => {
    dispatch(setToken(''));
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const currentDomain = window.location.origin;
    const url = `${currentDomain}/event`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between align-items-center w-100">
              <Nav className="mr-auto d-flex align-items-center">
                <Link to="/sales-list" className="nav-link">상점</Link>
                <Link to="/event" className="nav-link" onClick={handleButtonClick}>이벤트</Link>
              </Nav>
              <div className="d-flex flex-grow-1 justify-content-center">
                <Link to="/" className="navbar-brand">
                  <img src="logo.png" alt="Logo" style={{ height: "40px" }} />
                </Link>
              </div>
              <Nav className="ml-auto">
                {
                  isAuth ? <Nav.Link onClick={logout}>로그아웃</Nav.Link> :
                    <Link to="/login" className="nav-link">로그인</Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container fluid className="px-3 py-2">
          <Routes>
            <Route path="/" element={<SalesList />} ></Route>
            <Route path="/sales-list" element={<SalesList />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
