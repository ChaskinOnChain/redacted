import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {
  img: string;
  firstName: string;
  lastName: string;
  occupation: string;
  userId: string;
  friendId: string;
  removeFriend: (params: { userId: string; friendId: string }) => void;
  usersPage: boolean;
};

const UserFriend = ({
  img,
  firstName,
  lastName,
  occupation,
  userId,
  friendId,
  removeFriend,
  usersPage,
}: Props) => {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 relative">
          <Image className="rounded-full" fill={true} src={img} alt="pro pic" />
        </div>
        <div>
          <p className="font-bold">{firstName + " " + lastName}</p>
          <p>{occupation}</p>
        </div>
      </div>
      {usersPage && (
        <FontAwesomeIcon
          onClick={() => removeFriend({ userId, friendId })}
          className="border-4 p-2 rounded-full cursor-pointer text-red-400 border-red-400 hover:shadow"
          icon={faUserMinus}
        />
      )}
    </div>
  );
};

export default UserFriend;
