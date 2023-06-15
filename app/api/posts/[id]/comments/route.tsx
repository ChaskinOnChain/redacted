import Post from "@/models/Post";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }) => {
  await connectDb();
  const id = params.id;
  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ message: "no post found" }, { status: 500 });
  }
  const { text, commenterEmail } = await req.json();
  if (!text) {
    return NextResponse.json({ message: "no comment found" }, { status: 400 });
  }
  post.comments.push({ text, email: commenterEmail });
  await post.save();
  return NextResponse.json({ message: "comment posted" }, { status: 201 });
};
