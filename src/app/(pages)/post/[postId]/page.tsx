"use client";

import CommentCard from "@/components/CommentCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useAppContext } from "@/context";
import { CommentProps, PostProps, UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params }: PostPageProps) => {
  const { users, posts, reFetchComment } = useAppContext();

  let postSelected = posts.find(
    (post: PostProps) => post._id === params.postId
  );
  let createdUser = users.find(
    (user: UserProps) => user._id === postSelected.creator
  );
  const [loggedUser, setLoggedUser] = useState({ _id: "544555" });
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();

  const handleLikeComment = async (commentId: string) => {
    if (!session?.user?.email) {
      return;
    }
    try {
      const response = await fetch(`/api/comment/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "like",
          commentId: commentId,
          userId: loggedUser._id,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setComments(
        comments.filter((comment: CommentProps) =>
          comment._id === commentId
            ? comment.likes.push(loggedUser._id)
            : comment
        )
      );
    }
  };

  const fetchComments = async (postId: string) => {
    const data = await fetch(`/api/comment/${postId}`);
    const res = await data.json();

    setComments(res);
  };

  useEffect(() => {
    if (params.postId) {
      fetchComments(params.postId);
    }
  }, [reFetchComment]);

  useEffect(() => {
    if (session?.user?.email) {
      setLoggedUser(
        users.find((user: UserProps) => user.email === session?.user?.email)
      );
    }
  }, [session?.user?.email]);

  if (!postSelected && !createdUser) {
    return (
      <>
        <Header title="Post" />
      </>
    );
  }

  return (
    <>
      <Header title="Post" />
      <PostCard
        post={postSelected}
        creator={createdUser}
        loggedUser={loggedUser}
      />
      <div className="flex flex-col border-t-1 border-neutral-900">
        {comments.map((comment: Comment, index: number) => (
          <CommentCard
            comment={comment}
            likeComment={handleLikeComment}
            loggedUser={loggedUser}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default PostPage;
