import React from "react";
import UserAd from "./UserAd";
import UserFriendsList from "./UserFriendsList";

interface Props {
  id: string;
}

function RightUserPage({ id }: Props) {
  return (
    <div>
      <UserAd />
      <UserFriendsList id={id} />
    </div>
  );
}

export default RightUserPage;
