import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

export interface UserProps {
  _id: string;
  email: string;
  name: string;
  username: string;
  img: string | StaticImport;
  banner: string;
  bio: string;
  password: string;
  followers: string[];
  following: string[];
  createdAt: string;
}

export interface PostProps {
  _id: string;
  creator: string;
  post: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export interface CommentProps {
  _id: string;
  creator: string;
  postId: string;
  comments: string;
  likes: string[];
  createdAt: string;
}
