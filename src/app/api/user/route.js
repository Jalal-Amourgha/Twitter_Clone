import User from "@/models/user";
import { connectToDB } from "@/utils/database";

// export const revalidate = 0;

export const GET = async (request) => {
  try {
    await connectToDB();

    const users = await User.find({}).populate("username");

    const headers = new Headers();
    headers.set("Cache-Control", "no-store, max-age=0");

    console.log(users);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};
