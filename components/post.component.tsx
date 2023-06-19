import { FaHashtag, FaHome, FaUser } from "react-icons/fa";

import Link from "next/link";
import { PostProps } from "../types";
import moment from "moment";

const Post = ({ author, post }: PostProps) => {
  return (
    <div
      className="bg-white w-full p-4 m-2 rounded-2xl border border-stone-200 shadow-md"
      key={post.id}
    >
      {/* author */}
      <div className="flex gap-2 mb-4 ">
        <div className="bg-stone-200 p-3 rounded-full">
          <FaUser className="text-stone-500" />
        </div>

        <Link href={`/user/${author.id}`}>
          <div className="">
            <a className="text-sm">{author.name}</a>
            <p className="text-xs text-stone-400">@{author.username}</p>
          </div>
        </Link>
      </div>
      {/* body contents  */}
      <div className="font-serif text-sm h-20">{post.body}</div>

      <hr />
      <footer className="text-right items-center gap-1 justify-end mt-3 flex text-xs text-stone-500">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6V11.9995M12 11.9995L16 15M12 11.9995C12 11.9998 11.9997 11.9993 12 11.9995ZM1.28533 14.5C1.09868 13.6969 1 12.86 1 12C1 11.14 1.09868 10.3031 1.28533 9.5M10 1.18138C10.6486 1.06225 11.317 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C11.317 23 10.6486 22.9378 10 22.8186M6.5 2.4716C4.99963 3.33952 3.72328 4.55165 2.77893 6M2.77893 18C3.72328 19.4484 4.99963 20.6605 6.5 21.5284"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {moment(post.created).fromNow()}
      </footer>
    </div>
  );
};

export default Post;
