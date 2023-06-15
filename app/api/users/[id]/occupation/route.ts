import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }) => {
  try {
    const occupation = req.nextUrl.searchParams.get("occupation");
    console.log(occupation);
    if (!occupation) {
      return NextResponse.json({ message: "No occupation" }, { status: 400 });
    }
    await connectDb();
    const id = params.id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "No user" }, { status: 500 });
    }
    user.occupation = occupation;
    await user.save();
    return NextResponse.json({ message: "occupation change" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
