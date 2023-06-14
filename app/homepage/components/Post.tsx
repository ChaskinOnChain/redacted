import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";

type Props = {
  authorId: string;
  text: string;
  picture: string;
};

const Post = ({ authorId, text, picture }: Props) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user", authorId],
    queryFn: () => authorId && getUserById(authorId),
    enabled: !!authorId,
  });
  return (
    <div className="border-4 rounded-md p-4 mb-4">
      {data && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  className="rounded-full"
                  fill={true}
                  src={data.picturePath}
                  alt="pro pic"
                />
              </div>
              <div>
                <p className="font-bold">
                  {data.firstName + " " + data.lastName}
                </p>
                <p>{data.location}</p>
              </div>
            </div>
            <FontAwesomeIcon
              className="border-4 p-2 rounded-full cursor-pointer"
              icon={faUserPlus}
            />
          </div>
          <p className="my-2">{text}</p>
          <img className="rounded-md" src={picture} alt={text} />
        </div>
      )}
    </div>
  );
};

export default Post;
