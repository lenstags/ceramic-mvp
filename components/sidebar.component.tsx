import { FaHashtag, FaHome, FaUser } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { SidebarProps } from "../types";
import ceramicLogo from "../public/assets/img/nata-logo.svg";

export const Sidebar = ({ name, username, id }: SidebarProps) => {
  return (
    <div className="w-2/12 bg-stone-100 p-6">
      <div className="">
        <Image alt="" src={ceramicLogo} />
        <div className="mt-4 font-serif text-lg ">
          <Link href="/">
            <div className="flex cursor-pointer p-3 rounded-lg hover:bg-teal-200 gap-2 items-center">
              <FaHome /> Home
            </div>
          </Link>
          <Link href={`/profile`}>
            <div className="flex cursor-pointer p-3 rounded-lg hover:bg-teal-200 gap-2 items-center">
              <FaUser /> Profile
            </div>
          </Link>
          <Link href="/explore">
            <div className="flex cursor-pointer p-3 rounded-lg hover:bg-teal-200 gap-2 items-center">
              <FaHashtag /> Explorer
            </div>
          </Link>
          {/* 
          <div className="bg-yellow-400">
            {name}
            {name !== undefined ? (
              <div className="you">
                <b>{name}</b> <br />
                <Link href={`user/${id}`}>
                  <a>@{username}</a>
                </Link>
              </div>
            ) : (
              <>ggg</>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
