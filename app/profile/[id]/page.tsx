"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";
import { Post } from "@/types";

const UserProfile = ({ params }: { params: { id: string } }) => {
  
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional posts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
