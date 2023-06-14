"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Logout() {
  const [logout, setLogout] = useState(false);
  const [name, setName] = useState("");
  const session = useSession();
  console.log(session);

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(
        `http://localhost:3000/api/users/${session.data?.user?.email}`
      );
      const data = res.data;
      console.log(data);
      setName(data.firstName + " " + data.lastName);
    }
    getUser();
  }, [session]);
  return (
    <>
      <div
        onClick={() => setLogout((prev) => !prev)}
        className="bg-slate-300 p-2 rounded flex justify-between items-center gap-2 cursor-pointer relative"
      >
        {name && <p>{name}</p>}
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {logout && name && (
        <div className="absolute top-9 left-44 bg-slate-100 shadow-md rounded-md py-2">
          <div className="p-2 hover:bg-sky-100 cursor-pointer">{name}</div>
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
