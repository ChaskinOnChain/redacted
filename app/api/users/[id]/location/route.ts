import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }) => {
  try {
    const location = req.nextUrl.searchParams.get("location");
    if (!location) {
      return NextResponse.json({ message: "No location" }, { status: 400 });
    }
    await connectDb();
    const id = params.id;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "No user" }, { status: 500 });
    }
    user.location = location;
    await user.save();
    return NextResponse.json({ message: "location change" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
