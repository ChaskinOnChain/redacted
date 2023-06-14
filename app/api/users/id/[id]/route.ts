import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  const id = params.id;
  await connectDb();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  return NextResponse.json(user, { status: 200 });
};
