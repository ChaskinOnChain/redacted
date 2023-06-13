import React from "react";
import LoginHeading from "./LoginComponents/LoginHeading";
import Form from "./LoginComponents/Form";

function LoginSide() {
  return (
    <div className="w-1/2 min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="w-2/3 max-w-[30rem]">
        <LoginHeading />
        <Form />
      </div>
    </div>
  );
}

export default LoginSide;
