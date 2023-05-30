import Prompt from "@/models/post";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    
    const post = await Prompt.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch post created by user", {
      status: 500,
    });
  }
};
