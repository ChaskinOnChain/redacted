"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import BottomForm from "./BottomForm";

function Form() {
  const [isLogin, setIsLogin] = useState(true);

  const toggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      {isLogin ? <LoginForm /> : <RegisterForm toggle={toggle} />}
      <BottomForm isLogin={isLogin} toggle={toggle} />
    </div>
  );
}

export default Form;
