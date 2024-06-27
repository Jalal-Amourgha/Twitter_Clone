import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const infos = await User.findOne({
      email: params.id,
    }).populate("name");

    return new Response(JSON.stringify(infos), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user infos", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { type, items } = await request.json();

  try {
    await connectToDB();

    console.log(params.id);

    // Find the existing prompt by ID
    const userInfo = await User.findOne({
      _id: params.id,
    });

    console.log(type, items);
    if (!userInfo) {
      return new Response("User not found", { status: 404 });
    }

    if (type === "user-info") {
      userInfo.name = items.newName;
      userInfo.username = items.newUsername;
      userInfo.bio = items.newBio;
    }

    await userInfo.save();

    return new Response("Successfully updated the UserInfo", { status: 200 });
  } catch (error) {
    return new Response("Error Updating UserInfo", { status: 500 });
  }
};
