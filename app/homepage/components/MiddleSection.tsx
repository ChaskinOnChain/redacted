import React from "react";
import PublishPost from "./PublishPost";
import Feed from "./Feed";

interface Props {
  email: string;
}

export default function MiddleSection({ email }: Props) {
  return (
    <div>
      <PublishPost email={email} />
      <Feed email={email} />
    </div>
  );
}
