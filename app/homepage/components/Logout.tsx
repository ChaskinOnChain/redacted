"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useGetUserByEmail } from "@/app/hooks/queryHooks";

function Logout() {
  const [logout, setLogout] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { isLoading, data } = useGetUserByEmail(email || "");

  if (!email) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => setLogout((prev) => !prev)}
        className="p-2 border-4 shadow-sm rounded flex justify-between items-center gap-2 cursor-pointer relative "
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{data.firstName + " " + data.lastName}</p>
        )}
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {logout && data && (
        <div className="absolute top-9 left-44 bg-slate-400 shadow-md rounded-md py-2">
          <div className="p-2 hover:bg-sky-100 cursor-pointer">
            {data.firstName + " " + data.lastName}
          </div>
          <div
            onClick={() => signOut()}
            className="p-2 hover:bg-sky-100 cursor-pointer"
          >
            Log Out
          </div>
          <div
            onClick={() => setLogout((prev) => !prev)}
            className="p-2 hover:bg-sky-100 cursor-pointer"
          >
            Close
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
