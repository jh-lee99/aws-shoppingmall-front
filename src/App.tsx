import React, { useEffect, useState } from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
// import BoardList from "./pages/board-list/BoardList";
import SalesList from "./pages/sales-list/SalesList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import BoardRegister from './pages/board-register/BoardRegister';
// import BoardView from "./pages/board-view/BoardView";
// import BoardEdit from "./pages/board-edit/BoardEdit";
import { Nav, Navbar } from "react-bootstrap";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";

// 3rd react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from "./routes/PrivateRoute";
import { jwtUtils } from "./utils/JwtUtils";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/reducers/AuthReducer";
// import Home from "./pages/Home";


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
    e.preventDefault(); // 기본 링크 동작을 막습니다.

    // 현재 도메인 주소를 가져옵니다.
    const currentDomain = window.location.origin;

    // 현재 도메인 주소에 "/event" 경로를 추가합니다.
    const url = `${currentDomain}/event`;

    // 새로운 팝업 창을 엽니다.
    window.open(url, '_blank', 'width=600,height=400');
  };


  return (
    <>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Link to="/" className="navbar-brand">
              <img src="logo.png" alt="Logo" style={{ height: "40px" }} />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto flex-grow-1">
                {/* <Link to="/board-list" className="nav-link">게시판</Link>
                <Link to="/board-register" className="nav-link">글등록</Link> */}
                <Link to="/sales-list" className="nav-link">상점</Link>
                {/* 버튼을 추가합니다. */}
                <Link to="/event" className="nav-link" onClick={handleButtonClick}>이벤트</Link>
                {/* <button className="btn btn-primary" onClick={handleButtonClick}>팝업 창 열기</button> */}
                <span className="flex-grow-1"></span>
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
            {/* <Route path="/board-list" element={<BoardList />}></Route>
            <Route path="/board-view/:id" element={<BoardView />}></Route> */}

            {/* <Route element={<PrivateRoute component={undefined} />}>
              <Route path="/board-register" element={<BoardRegister />} />
              <Route path="/board-edit/:id" element={<BoardEdit />} />
            </Route> */}

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
