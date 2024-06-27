import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { id1, id2 } = await request.json();

  try {
    await connectToDB();

    const FollowerUser = await User.findOne({
      _id: id1,
    });

    const FollowedUser = await User.findOne({
      _id: id2,
    });

    if (!FollowerUser && !FollowedUser) {
      return new Response("User not found", { status: 404 });
    }

    if (FollowerUser.following.includes(id2)) {
      FollowerUser.following = FollowerUser.following.filter(
        (id) => id !== id2
      );
    } else {
      FollowerUser.following = [...FollowerUser.following, id2];
    }

    if (FollowedUser.followers.includes(id1)) {
      FollowedUser.followers = FollowedUser.followers.filter(
        (id) => id !== id1
      );
    } else {
      FollowedUser.followers = [...FollowedUser.followers, id1];
    }

    await FollowerUser.save();
    await FollowedUser.save();

    return new Response("Successfully updated the FollowerUser FollowedUser", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating FollowerUser FollowedUser", {
      status: 500,
    });
  }
};
