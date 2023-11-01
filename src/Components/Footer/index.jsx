import React from "react";
import "./footer.scss";
import { MdLocationOn } from "react-icons/md";
import {
  BiLogoGmail,
  BiPhoneCall,
  BiSolidPhoneCall,
  BiLogoTiktok,
} from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-cover">
        <div className="box-img-res">
          <div className="box-img-res-image">
            <img
              src="https://lacdau.com/static/assets/default/images/logo.png"
              alt=""
            />
          </div>
        </div>
        <div className="box-footer box-4">
          <p className="box-footer-title">LIÊN HỆ</p>
          <div className="box-footer-box">
            <p className="box-footer-box-normal">
              <MdLocationOn />
              Trung Liệt, Đống Đa
            </p>
            <p className="box-footer-box-res">
              <MdLocationOn />
              15 Yên Lãng, Phường Trung Liệt, Quận Đống Đa, Hà Nội
            </p>
            <p>
              <BiLogoGmail /> lacdau@gmail.com
            </p>
            <p>
              <BiSolidPhoneCall />
              0349.xxx.461
            </p>
          </div>
          <div className="box-footer-icon-social">
            <a href="https://www.facebook.com/lacdaustore" target="_blank">
              <BsFacebook className="facebook" />
            </a>
            <a href="https://www.instagram.com/lac.dau/" target="_blank">
              <BsInstagram className="insta" />
            </a>

            <a
              href="https://www.tiktok.com/@lacdaushop?lang=vi-VN"
              target="_blank"
            >
              <BiLogoTiktok className="tiktok" />
            </a>
            <a href="tel:0965607272" title="0965.60.7272">
              <BiPhoneCall className="call" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0kL-L4W-QBwgwqCv408J2A"
              target="_blank"
            >
              <AiFillYoutube className="youtube" />
            </a>
          </div>
        </div>
        <div className="box-footer box-res">
          <p className="box-footer-title">VỀ LẮC ĐẦU</p>
          <div className="box-footer-box">
            <p>Giới thiệu</p>
            <p>Tuyển dụng</p>
          </div>
        </div>
        <div className="box-footer box-res">
          <p className="box-footer-title">HỖ TRỢ KHÁCH HÀNG</p>
          <div className="box-footer-box">
            <p>Hướng dẫn mua hàng trực tuyến</p>
            <p>Hướng dẫn thanh toán</p>
            <p>Yêu cầu bảo hành</p>
          </div>
        </div>
        <div className="box-footer box-res">
          <p className="box-footer-title">CHÍNH SÁCH CHUNG</p>
          <div className="box-footer-box">
            <p>Chính sách đổi trả và hoàn tiền</p>
            <p>Chính sách, quy định chung</p>
            <p>Chính sách vận chuyển</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          Copyright © 2023 <a href="https://lacdau.com/">lacdau.com</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
