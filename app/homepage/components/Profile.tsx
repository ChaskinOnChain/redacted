import React from "react";
import { getUserByEmail } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Props {
  email: string;
}

function Profile({ email }: Props) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user", email],
    queryFn: () => email && getUserByEmail(email),
    enabled: !!email,
  });

  // console.log(data);
  // const session = useSession();
  // console.log(session);

  return (
    <>
      {isLoading && <p> Loading...</p>}
      {data && (
        <>
          <div className="flex gap-3">
            <div className="h-16 w-16 relative">
              <Image
                className="rounded-full"
                fill={true}
                src={data.picturePath}
                alt="pro pic"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-bold capitalize">
                {data.firstName} {data.lastName}
              </p>
              <p>
                {data.friends.length} friend
                {data.friends.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-slate-300/50 my-4"></div>
          <div className="flex pl-[3px] gap-4 items-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{data.location}</p>
          </div>
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faSuitcase} />
            <p className="capitalize">{data.occupation}</p>
          </div>
          <div className="h-[1px] w-full bg-slate-300/50 my-4"></div>
          <div className="flex items-center justify-between text-sm">
            <p>Who's viewed your profile</p>
            <p className="font-bold">{data.viewedProfile}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Impressions of your post</p>
            <p className="font-bold">{data.impressions}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
