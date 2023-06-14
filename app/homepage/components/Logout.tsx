"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "@/utils/api/apiUtils";

function Logout() {
  const [logout, setLogout] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const userQuery = useQuery({
    queryKey: ["user", email],
    queryFn: () => email && getUserByEmail(email),
    enabled: !!email,
  });

  return (
    <>
      <div
        onClick={() => setLogout((prev) => !prev)}
        className=" p-2 border-4 shadow-sm rounded flex justify-between items-center gap-2 cursor-pointer relative"
      >
        {userQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{userQuery.data.firstName + " " + userQuery.data.lastName}</p>
        )}
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {logout && userQuery.data && (
        <div className="absolute top-9 left-44 bg-slate-400 shadow-md rounded-md py-2">
          <div className="p-2 hover:bg-sky-100 cursor-pointer">
            {userQuery.data.firstName + " " + userQuery.data.lastName}
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
