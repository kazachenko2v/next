import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new Response("Post Not Found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { post, tag } = await request.json();

  try {
    await connectToDB();

    const existingPost = await Post.findById(params.id);

    if (!existingPost) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response("Successfully updated the Post", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Post", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    await Post.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting post", { status: 500 });
  }
};
