"use client";

import CommentCard from "@/components/CommentCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";
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
  const [comments, setComments] = useState([]);

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

  return (
    <>
      <Header title="Post" />
      <PostCard postId={params.postId} userId={createdUser._id} />
      <div className="flex flex-col border-t-1 border-neutral-900">
        {comments.map((comment: Comment, index: number) => (
          <CommentCard comment={comment} key={index} />
        ))}
      </div>
    </>
  );
};

export default PostPage;
