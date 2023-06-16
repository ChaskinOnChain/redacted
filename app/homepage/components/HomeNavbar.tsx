import DarkLight from "@/app/LoginComponents/DarkLight";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faBell,
  faQuestionCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";
import NavLogo from "./NavLogo";

function HomeNavbar() {
  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center px-12 max-w-[1466px] mx-auto">
        <div className="relative flex items-center justify-between gap-3">
          <NavLogo />
          <div>
            <input
              className="bg-slate-200 rounded px-4 py-1 text-base"
              type="text"
              placeholder="Search..."
            />
            <FontAwesomeIcon className="-ml-8" icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-4">
          <DarkLight />
          <FontAwesomeIcon icon={faMessage} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faQuestionCircle} />
          <Logout />
        </div>
      </nav>
      <div className="h-1 w-full bg-slate-200"></div>
    </>
  );
}

export default HomeNavbar;
