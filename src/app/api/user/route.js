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

export const PATCH = async (request, { params }) => {
  const { userId, postId, type } = await request.json();

  try {
    await connectToDB();

    const SelectedUser = await User.findOne({
      _id: userId,
    });

    if (type === "bookmark") {
      if (SelectedUser.bookmarks.includes(postId)) {
        SelectedUser.bookmarks = SelectedUser.bookmarks.filter(
          (id) => id !== postId
        );
      } else {
        SelectedUser.bookmarks = [...SelectedUser.bookmarks, postId];
      }
    }

    await SelectedUser.save();

    return new Response("Successfully updated the FollowerUser FollowedUser", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating FollowerUser FollowedUser", {
      status: 500,
    });
  }
};
