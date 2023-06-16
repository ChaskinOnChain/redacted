import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "No ID" }, { status: 401 });
  }
  const posts = await Post.find({ author: id });
  if (!posts) {
    return NextResponse.json({ message: "No posts" }, { status: 401 });
  }
  return NextResponse.json(posts, { status: 201 });
};
