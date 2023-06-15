import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }) => {
  const { friendId } = await req.json();
  if (!friendId) {
    return NextResponse.json({ message: "No friend Id" }, { status: 400 });
  }
  const userId = params.id;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  await user.friends.push(friendId);
  await user.save();
  return NextResponse.json({ message: "Friend Added" }, { status: 201 });
};

export const DELETE = async (req: NextRequest, { params }) => {
  const friendId = req.nextUrl.searchParams.get("friendId");
  if (!friendId) {
    return NextResponse.json({ message: "No friend Id" }, { status: 400 });
  }
  const userId = params.id;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  user.friends = await user.friends.filter((id) => id !== friendId);
  await user.save();
  return NextResponse.json({ message: "Friend Removed" }, { status: 201 });
};
