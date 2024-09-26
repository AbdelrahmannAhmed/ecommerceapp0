import { jwtDecode } from "jwt-decode";
import React from "react";
import { json, Navigate } from "react-router-dom";

export default function Protectedroutes({ children }) {
  let token = localStorage.getItem("token");
  try {
    const decoded = jwtDecode(JSON.stringify(token));
  } catch (error) {
    console.log(error);

    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  if (token) return children;
  return <Navigate to="/signin" />;
}
