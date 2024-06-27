import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  console.log("salam khoya silva labas 3lk");

  try {
    await connectToDB();

    const users = await User.find({}).populate("name");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};
