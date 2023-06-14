import Post from "@/models/Post";
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text, picture, email } = await req.json();

  if (!text || !email) {
    return NextResponse.json({ message: "No text or email" }, { status: 400 });
  }

  await connectDb();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Couldn't find user" },
      { status: 500 }
    );
  }

  const newPost = new Post({
    text,
    picture,
    author: user,
  });

  await newPost.save();

  return NextResponse.json({ message: "post uploaded" }, { status: 201 });
};

export const GET = async (req: NextRequest) => {
  await connectDb();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts, { status: 201 });
};
