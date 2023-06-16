"use client";

import { useRouter } from "next/navigation";
import Logo from "./Logo";

function NavLogo() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/homepage")}
      className="flex items-center justify-between gap-3 cursor-pointer"
    >
      <Logo />
      <span className="font-bold text-xl text-sky-400">Redacted</span>
    </div>
  );
}

export default NavLogo;
