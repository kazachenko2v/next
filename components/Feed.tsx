"use client";

import { useState, useEffect, useCallback } from "react";

import PostCard from "./PostCard";
import { Post } from "@/types";

const PostCardList = ({
  data,
  handleTagClick,
}: {
  data: Post[] | null;
  handleTagClick: (str: string) => void;
}) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data &&
        data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[] | null>(null);

  const fetchPosts = async () => {
    const response = await fetch("/api/post");

    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    if (allPosts) {
      return allPosts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.post)
      );
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        if (searchResult) {
          setSearchedResults(searchResult);
        }
      }, 2000)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName);
    if (searchResult) {
      setSearchedResults(searchResult);
    }
  };

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
        />
      </form>

      {searchText ? (
        <PostCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PostCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
