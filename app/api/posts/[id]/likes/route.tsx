import Post from "@/models/Post";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }) => {
  const id = params.id;
  const { liked, authorId } = await req.json();
  await connectDb();
  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }

  if (!liked) {
    if (!post.likes.includes(authorId)) {
      post.likes.push(authorId);
    }
  } else {
    post.likes = post.likes.filter((id) => id !== authorId);
  }

  await post.save();

  return NextResponse.json(post, { status: 200 });
};
