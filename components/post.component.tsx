import Link from "next/link";
import { PostProps } from "../types";

const Post = ({ author, post }: PostProps) => {
  return (
    <div className="bg-white p-4 m-2 rounded-lg border shadow-lg" key={post.id}>
      <div>{post.body}</div>
      <Link href={`/user/${author.id}`}>
        <a>
          {author.emoji} {author.name} <small>@{author.username}</small>
        </a>
      </Link>
    </div>
  );
};

export default Post;
