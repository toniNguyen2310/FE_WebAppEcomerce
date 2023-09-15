import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <div>
      404 Not Found == Trang không tồn tại (link)
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </div>
  );
}

export default NotFound;
