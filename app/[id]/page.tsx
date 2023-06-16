"use client";

import { useSession } from "next-auth/react";
import RightUserPage from "./components/RightUserPage";
import UserFeed from "./components/UserFeed";
import UserProfile from "./components/UserProfile";
import { useRouter } from "next/navigation";

function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <div
        className={`min-h-screen xl:flex-row flex-col flex justify-center gap-6 px-12 py-6`}
      >
        <UserProfile id={id} />
        <UserFeed id={id} />
        <RightUserPage id={id} />
      </div>
    );
  }
}

export default page;
