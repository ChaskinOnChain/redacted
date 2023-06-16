import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "No ID" }, { status: 401 });
  }
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const totalPosts = await Post.countDocuments({ author: id });

  const posts = await Post.find({ author: id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const lastPage = Math.ceil(totalPosts / limit);
  const reachedLastPage = page >= lastPage;

  if (!posts) {
    return NextResponse.json({ message: "No posts" }, { status: 401 });
  }
  return NextResponse.json({ posts, reachedLastPage }, { status: 201 });
};
