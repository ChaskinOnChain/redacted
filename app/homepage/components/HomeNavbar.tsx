import DarkLight from "@/app/LoginComponents/DarkLight";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faBell,
  faQuestionCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import Logout from "./Logout";

function HomeNavbar() {
  return (
    <nav className="w-full h-16 flex justify-between items-center px-12 border-b-4">
      <div className=" flex items-center justify-between gap-3 relative">
        <Logo />
        <span className="font-bold text-xl text-sky-400">Redacted</span>
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
  );
}

export default HomeNavbar;
