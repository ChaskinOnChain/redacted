"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  console.log(session);

  if (session.status === "authenticated") {
    return (
      <div className="min-h-screen">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default page;
