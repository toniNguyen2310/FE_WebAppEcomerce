import React, { useState, useRef } from "react";
import "./register.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
function RegisterPage(props) {
  const refInput = useRef(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    console.log({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    //reset input after submit

    refInput.current.focus();
    setIsShowPass(false);
    setEmail("");
    setName("");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
