import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    console.log(params.id);

    const infos = await User.findOne({
      $or: [{ email: params.id }, { username: params.id }],
    }).populate("username");

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

    // Find the existing prompt by ID
    const userInfo = await User.findOne({
      _id: params.id,
    });

    if (!userInfo) {
      return new Response("User not found", { status: 404 });
    }

    if (type === "user-info") {
      if (items.newImg) {
        userInfo.img = items.newImg;
      }

      if (items.newBanner) {
        userInfo.banner = items.newBanner;
      }

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
