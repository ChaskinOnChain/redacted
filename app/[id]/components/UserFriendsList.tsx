"use client";

import { getUserByEmail, getUserById } from "@/utils/api/apiUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import UserFriend from "./UserFriend";
import { useGetUserByEmail, useGetUserById } from "@/app/hooks/queryHooks";

interface Props {
  id: string;
}

const UserFriendsList = ({ id }: Props) => {
  const session = useSession();
  const email = session.data?.user?.email;
  const [usersPage, setUsersPage] = useState(false);
  const { data: userData } = useGetUserByEmail(email || "");
  const { data, isLoading } = useGetUserById(id);

  const { data: usersFriends, isLoading: isUsersFriendsLoading } = useQuery({
    queryKey: ["users", data?.friends],
    queryFn: async () => {
      const userFriendsPromises = data?.friends.map((friendId: string) =>
        getUserById(friendId)
      );
      return Promise.all(userFriendsPromises);
    },
    enabled: data?.friends.length > 0,
  });

  const queryClient = useQueryClient();
  const removeFriendMutation = useMutation(
    ({ userId, friendId }) =>
      axios.delete(`/api/users/${userId}/friends?friendId=${friendId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  useEffect(() => {
    if (userData && userData._id === id) {
      setUsersPage(true);
    }
  }, [userData, id]);

  if (!email) {
    return null;
  }

  return (
    <div className="mt-4 border-4 shadow-md rounded-md p-4">
      <h4 className="font-bold">Friends List</h4>
      <div>
        {isLoading || (isUsersFriendsLoading && data?.friends.length > 0) ? (
          <p>Loading...</p>
        ) : data?.friends && data?.friends.length > 0 ? (
          data.friends.map((friendId, index) => {
            const friend = usersFriends[index];
            return (
              <UserFriend
                userId={data._id}
                friendId={friendId}
                key={index}
                img={friend?.picturePath}
                firstName={friend?.firstName}
                lastName={friend?.lastName}
                occupation={friend?.occupation}
                removeFriend={removeFriendMutation.mutate}
                usersPage={usersPage}
              />
            );
          })
        ) : (
          <p>No Friends :(</p>
        )}
      </div>
    </div>
  );
};

export default UserFriendsList;
