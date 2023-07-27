import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/UserAuth/Login";
import Register from "../components/UserAuth/Register";
export default function UserAuth() {
  const { isOpen } = useSelector((state) => state.modal);

  return <div>{isOpen ? <Login /> : <Register />}</div>;
}
