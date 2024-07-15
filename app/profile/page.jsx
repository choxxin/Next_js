"use client";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fecthPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setposts(data);
    };
    if (session?.user.id) fecthPost();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const ans = confirm(
      "Are you sure you want to delete your posts? This action cannot be undone."
    );

    if (!ans) {
      return;
    } else {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
