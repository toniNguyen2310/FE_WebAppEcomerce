import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { callRegister } from "../../services.js/api";
import { toast } from "react-toastify";
import "./register.scss";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage(props) {
  const navigate = useNavigate();
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);

  //HANDLE REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await callRegister(email, username, password, phone);
    if (res?.data?._id) {
      toast.success("Đăng ký thành công");
      console.log("Đăng ký thành công");
      navigate("/login");
    } else {
      toast.error("Đăng ký thất bại");
    }
    refInput.current.focus();
    setIsShowPass(false);
    setEmail("");
    setUserName("");
    setPassword("");
    setPhone("");
  };
  return (
    <div className="register-page">
      <div className="register-page-form">
        <div className="register-page-form-lorup">
          <NavLink to={`/login`}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Đăng ký
          </NavLink>
        </div>

        <div className="register-page-form-container">
          {/* Email */}
          <div className="register-page-form-container-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Vui lòng nhập email của bạn"
              ref={refInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Name */}
          <div className="register-page-form-container-input">
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              id="name"
              placeholder="Họ và tên"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="register-page-form-container-input input-password">
            <label htmlFor="passwordregister">Mật khẩu</label>
            <input
              id="passwordregister"
              type={isShowPass ? "text" : "password"}
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPass ? (
              <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setIsShowPass(!isShowPass)} />
            )}
          </div>

          {/* Password Again */}
          {/* <div className="register-page-form-container-input input-password">
            <label htmlFor="password">Nhập lại mật khẩu</label>
            <input
              id="passwordregister"
              type={isShowPass ? "text" : "password"}
              placeholder="Vui lòng nhập lại mật khẩu!!"
            />
          </div> */}

          {/* Phone Number */}
          <div className="register-page-form-container-input">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="number"
              id="phone"
              placeholder="Số điện thoại ...."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="register-page-form-footer">
          <a
            href=""
            className="register-page-form-footer-btn"
            onClick={handleRegister}
          >
            Đăng ký
          </a>
          <p>
            Bạn đã có tài khoản{" "}
            <NavLink to={`/login`}>Đăng nhập ngay!!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
