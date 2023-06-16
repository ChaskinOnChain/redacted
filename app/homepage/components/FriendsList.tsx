import { getUserByEmail, getUserById } from "@/utils/api/apiUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Friend from "./Friend";
import axios from "axios";
import { useGetUserByEmail } from "@/app/hooks/queryHooks";

interface Props {
  email: string;
}

const FriendsList = ({ email }: Props) => {
  const { data, isLoading } = useGetUserByEmail(email);

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

  return (
    <div className="mt-4 border-4 shadow-md rounded-md p-4">
      <h4 className="font-bold">Friends List</h4>
      <div>
        {isLoading || (isUsersFriendsLoading && data?.friends.length > 0) ? (
          <p>Loading...</p>
        ) : data?.friends.length > 0 ? (
          data.friends.map((friendId, index) => {
            const friend = usersFriends[index];
            return (
              <Friend
                userId={data._id}
                friendId={friendId}
                key={index}
                img={friend?.picturePath}
                firstName={friend?.firstName}
                lastName={friend?.lastName}
                occupation={friend?.occupation}
                removeFriend={removeFriendMutation.mutate}
              />
            );
          })
        ) : (
          <p>No friends :(</p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
