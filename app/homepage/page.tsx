"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileSection from "./components/ProfileSection";
import MiddleSection from "./components/MiddleSection";

function page() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  const email = session?.data?.user?.email;

  if (session.status === "authenticated") {
    return (
      <div className={`min-h-screen flex gap-6 px-12 py-6`}>
        <ProfileSection email={email} />
        <MiddleSection email={email} />
        <div></div>
      </div>
    );
  }
}

export default page;
