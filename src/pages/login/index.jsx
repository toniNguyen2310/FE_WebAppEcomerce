import React, { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./login.scss";
import { message, notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../Components/Export/ExportVarible";
import { doLoginAction } from "../../redux/account/accountSlice";
import { callLogin } from "../../services.js/api";
function LoginPage(props) {
  const navigate = useNavigate();
  const refInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const topRight = "topRight";
  //Enter để nộp
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin(e);
    }
  };
  //HANDLE LOGIN
  let isDuplicate = false;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //VALIDATE VALUE
    if (!email || !password) {
      api.info({
        message: `Vui lòng nhập thông tin `,
        topRight,
      });
      setIsLoading(false);
      return;
    }

    const res = await callLogin(email.trim(), password.trim());
    if (res?.data?.userWP && !isDuplicate) {
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("refresh_token", res.data.refreshToken);
      dispatch(doLoginAction(res.data.userWP));
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.userWP.username,
        })
      );
      isDuplicate = true;
      message.success("Đăng nhập thành công");
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("Thông tin đăng nhập không đúng");
      return;
    }
    setEmail("");
    setPassword("");
    setIsShowPass("");
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div className="login-page">
      {contextHolder}
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
              ref={refInput}
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
          <a
            href=""
            className="login-page-form-footer-btn"
            onClick={handleLogin}
          >
            Đăng nhập
            {isLoading && (
              <LoadingButton color={"#29a07e"} secondaryColor={"#ffffff"} />
            )}
          </a>
          <p>
            Bạn chưa có tài khoản?
            <NavLink to={`/register`}>Đăng ký ngay</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
