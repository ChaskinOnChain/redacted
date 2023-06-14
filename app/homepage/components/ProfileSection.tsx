import React from "react";
import Profile from "./Profile";

interface Props {
  email: string;
}

function ProfileSection({ email }: Props) {
  return (
    <div className={`shadow-md w-72 h-64 p-4 rounded-md border-4`}>
      <Profile email={email} />
    </div>
  );
}

export default ProfileSection;
