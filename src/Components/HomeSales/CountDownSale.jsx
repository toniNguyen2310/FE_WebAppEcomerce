import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosFlash } from "react-icons/io";

function CountDownSale(props) {
  //TIME COUNTER
  const [timeFlashSale, setTimeFlashSale] = useState(0);
  const [displayTimeFlashSale, setdisplayTimeFlashSale] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const newDate = new Date();

  useEffect(() => {
    countTimeFlashSale();
  }, []);

  useEffect(() => {
    let timeCountDown = setTimeout(() => {
      if (timeFlashSale < 1) {
        clearTimeout(timeCountDown);
      } else {
        setTimeFlashSale((prev) => prev - 1);
      }
    }, 1000);
    const h = Math.floor(timeFlashSale / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((timeFlashSale % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(timeFlashSale % 60)
        .toString()
        .padStart(2, "0");

    setdisplayTimeFlashSale({
      hour: h,
      minute: m,
      second: s,
    });
    return () => {
      clearTimeout(timeCountDown);
    };
  }, [timeFlashSale]);

  const countTimeFlashSale = () => {
    let timeCurrent =
      newDate.getHours() * 60 * 60 +
      newDate.getMinutes() * 60 +
      newDate.getSeconds();
    let timeOneDay = 86400;

    setTimeFlashSale(timeOneDay - timeCurrent);
  };

  return (
    <div className="box-sale-title">
      <h2 className="title-sale">
        <IoIosFlash /> FLASHSALE
      </h2>
      <div className="box-countdown">
        <p className="text-countdow"> Ưu đãi kết thúc sau:</p>
        <div className="box-time">
          <p className="time">0</p>
          <p className="text">Ngày</p>
        </div>
        <div className="box-time">
          <p className="time">{displayTimeFlashSale.hour}</p>
          <p className="text">Giờ</p>
        </div>
        <div className="box-time">
          <p className="time">{displayTimeFlashSale.minute}</p>
          <p className="text">Phút</p>
        </div>
        <div className="box-time">
          <p className="time">{displayTimeFlashSale.second}</p>
          <p className="text">Giây</p>
        </div>
      </div>
    </div>
  );
}

export default CountDownSale;
