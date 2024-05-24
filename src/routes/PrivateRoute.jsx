import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Navigate 대신 useNavigate를 가져옴
import { useSelector } from 'react-redux';
import { ROUTES_PATH } from './index';
import { jwtUtils } from '../utils/JwtUtils';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const token = useSelector(state => state.Auth.token);
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!jwtUtils.isAuth(token)) {
    // Navigate 대신 useNavigate 훅을 사용하여 리다이렉트 처리
    navigate(`${ROUTES_PATH.Login}?redirectUrl=${rest.path}`, { replace: true });
    return null; // 리다이렉트 시, JSX를 반환하지 않음
  }

  return <Outlet {...rest} element={<RouteComponent />} />;
};

export default PrivateRoute;
