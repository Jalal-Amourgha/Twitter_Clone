import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email, name, username, password } = await req.json();

    await connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email,
      name: name,
      username: username,
      password: hashedPassword,
      followers: [],
      following: [],
      bio: "",
      img: "https://files.edgestore.dev/kbupit1ufke42s4x/myPublicImages/_public/c8d0630f-b76d-4a47-a879-0525729eabbc.jpg",
      banner: "",
    });

    return NextResponse.json({ message: "User Registed" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something  wrong" }, { status: 500 });
  }
}
