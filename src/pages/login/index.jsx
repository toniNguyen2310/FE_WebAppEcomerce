import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./login.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { callLogin } from "../../services.js/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { Button, message, Space } from "antd";
function LoginPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const dispatch = useDispatch();

  //Enter để nộp
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin(e);
    }
  };
  //HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    //VALIDATE VALUE
    if (!email || !password) {
      toast.warning("Vui lòng nhập thông tin");
      return;
    }
    const res = await callLogin(email, password);
    if (res?.data?.userWP) {
      localStorage.setItem("access_token", res.data.accessToken);
      dispatch(doLoginAction(res.data.userWP));
      toast.success("Đăng nhập thành công", { toastId: "success1" });
      navigate("/");
    } else {
      toast.error(res.data);
      return;
    }
    setEmail("");
    setPassword("");
    setIsShowPass("");
  };

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
              value={email}
              onKeyUp={(e) => handleKeyPress(e)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-page-form-container-input input-password">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="passwordLogin"
              type={isShowPass ? "text" : "password"}
              placeholder="Vui lòng nhập mật khẩu"
              onKeyUp={(e) => handleKeyPress(e)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <a
            href=""
            className="login-page-form-footer-btn"
            onClick={handleLogin}
          >
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
