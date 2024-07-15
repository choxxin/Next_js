"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  console.log(post);
  const { data: session } = useSession();
  const pathaName = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState("");
  const handleProfileClick = () => {
    console.log(post);
    if (post.creator._id === session?.user.id) {
      //id the useritself direct him to his profile only
      return router.push("/profile");
    }
    router.push(`/otherprofile?id=${post.creator._id}`);
  };
  // /profile/12345?name=john_doe this is the url

  const handlecopy = () => {
    console.log(post.creator.image);
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="User_image "
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handlecopy}>
          <Image
            src={
              copied === post.prompt
                ? "assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathaName === "/profile" && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100">
          <p className="green_gradient font-inter text-sm" onClick={handleEdit}>
            Edit
          </p>
          <p
            className="orange_gradient font-inter text-sm"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
