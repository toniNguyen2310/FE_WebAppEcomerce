import React from "react";
import { useNavigate } from "react-router-dom";

function NotPermitted(props) {
  const navigate = useNavigate();
  return (
    <div>
      Không thể truy cập do bạn không phải ADMIN
      <button onClick={() => navigate("/")}>Quay lai</button>
    </div>
  );
}

export default NotPermitted;
