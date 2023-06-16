import Post from "@/models/Post";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }) => {
  const id = params.id;
  await connectDb();
  if (!id) {
    return NextResponse.json({ message: "no ID" }, { status: 400 });
  }
  await Post.deleteOne({ _id: id });
  return NextResponse.json({ message: "Post Deleted" }, { status: 201 });
};
