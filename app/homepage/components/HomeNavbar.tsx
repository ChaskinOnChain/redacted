"use client";

import DarkLight from "@/app/LoginComponents/DarkLight";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";
import NavLogo from "./NavLogo";
import { useSearch } from "../SearchContext/SearchHook";

function HomeNavbar() {
  const { setSearch } = useSearch();
  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center px-12 max-w-[1466px] mx-auto">
        <div className="relative flex items-center justify-between gap-3">
          <NavLogo />
          <div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  setSearch(target.value);
                  target.value = "";
                }
              }}
              name="search"
              placeholder="Search..."
              type="text"
              className="bg-slate-200 rounded px-4 py-1 text-base"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-4">
          <DarkLight />
          <FontAwesomeIcon icon={faMessage} />
          <Logout />
        </div>
      </nav>

      <div className="h-1 w-full bg-slate-200"></div>
    </>
  );
}

export default HomeNavbar;
