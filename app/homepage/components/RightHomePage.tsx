import React from "react";
import Ad from "./Ad";
import FriendsList from "./FriendsList";

interface Props {
  email: string;
}

function RightHomePage({ email }: Props) {
  return (
    <div>
      <Ad />
      <FriendsList email={email} />
    </div>
  );
}

export default RightHomePage;
