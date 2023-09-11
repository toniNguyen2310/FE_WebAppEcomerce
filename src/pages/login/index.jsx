import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./login.scss";
function LoginPage(props) {
  const [isShowPass, setIsShowPass] = useState(false);
  return (
    <div className="login-page">
      <div className="login-page-form">
        <div className="login-page-form-lorup">
          <NavLink to={`/login`}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Đăng ký
          </NavLink>
        </div>
        <div className="login-page-form-container">
          <div className="login-page-form-container-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Vui lòng nhập email của bạn"
            />
          </div>
          <div className="login-page-form-container-input input-password">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="passwordLogin"
              type={isShowPass ? "text" : "password"}
              placeholder="Vui lòng nhập mật khẩu"
            />
            {isShowPass ? (
              <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setIsShowPass(!isShowPass)} />
            )}
          </div>
        </div>
        <div className="login-page-form-footer">
          <a href="" className="login-page-form-footer-misspass">
            Quên mật khẩu
          </a>
          <a href="" className="login-page-form-footer-btn">
            Đăng nhập
          </a>
          <p>
            Bạn chưa có tài khoản?{" "}
            <NavLink to={`/register`}>Đăng ký ngay</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
