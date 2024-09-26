import React from "react";
import "../Loading/Loading.css";

export default function Loading() {
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center ">
      <div className="loader" />
    </div>
  );
}
