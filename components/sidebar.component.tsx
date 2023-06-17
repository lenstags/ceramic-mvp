import { FaHashtag, FaHome, FaUser } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { SidebarProps } from "../types";
import ceramicLogo from "../public/assets/img/nata-logo.svg";

export const Sidebar = ({ name, username, id }: SidebarProps) => {
  return (
    <div className="w-3/12 bg-stone-100 px-6 py-4">
      <div className="">
        <Image alt="" src={ceramicLogo} />
        <div className="mt-4 space-y-2">
          <Link href="/">
            <div className="flex gap-2 items-center">
              <FaHome /> Home
            </div>
          </Link>
          <Link href={`/profile`}>
            <div className="flex gap-2 items-center">
              <FaUser /> Profile
            </div>
          </Link>
          <Link href="/explore">
            <div className="flex gap-2 items-center">
              <FaHashtag /> Explore
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-yellow-400">
        {name !== undefined ? (
          <div className="you">
            <b>{name}</b> <br />
            <Link href={`user/${id}`}>
              <a>@{username}</a>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
