import React from "react";
import Profile from "./Profile";

interface Props {
  email: string;
}

function ProfileSection({ email }: Props) {
  return (
    <div
      className={`shadow-md min-w-[20rem] h-72 p-4 rounded-md border-4 flex flex-col justify-between`}
    >
      <Profile email={email} />
    </div>
  );
}

export default ProfileSection;
