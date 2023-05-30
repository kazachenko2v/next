"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Post } from "@/types";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (id: string) => {
    router.push(`/update-post?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${id}`, {
          method: "DELETE",
        });

        if (myPosts) {
          const filteredPosts = myPosts.filter((item) => item._id !== id);
          setMyPosts(filteredPosts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional posts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
