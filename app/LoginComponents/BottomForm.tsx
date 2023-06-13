import React from "react";
import Button from "./Button";

type Props = {
  toggle: () => void;
  isLogin: boolean;
};

const BottomForm = ({ toggle, isLogin }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 my-8">
        <div className="w-[48%] h-[2px] bg-black"></div>
        OR
        <div className="w-[48%] h-[2px] bg-black"></div>
      </div>
      <p className="text-center">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <span
              className="text-sky-500 font-bold cursor-pointer"
              onClick={toggle}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              className="text-sky-500 font-bold cursor-pointer"
              onClick={toggle}
            >
              Login here
            </span>
          </>
        )}
      </p>
      <div className="flex flex-col gap-2 font-bold mt-8">
        <Button name="Google" />
      </div>
    </div>
  );
};

export default BottomForm;
