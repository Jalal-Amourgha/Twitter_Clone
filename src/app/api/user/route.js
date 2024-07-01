import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const users = await User.find({}).populate("name");

    const headers = new Headers();
    headers.set("Cache-Control", "no-store");

    return new Response(JSON.stringify(users), { status: 200, headers });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};
