"use client";

import { useAppContext } from "@/context";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { FileX2, ImageUp } from "lucide-react";

interface EditProfileProps {
  closeBtn: () => void;
  userData: any;
}

const EditProfile = ({ closeBtn, userData }: EditProfileProps) => {
  const { reFetchUsers, setReFetchUsers } = useAppContext();
  const { edgestore } = useEdgeStore();
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();
  const [name, setName] = useState(userData.name);
  const [username, setUserame] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var imgUpload: any = { url: "" };
    var bannerUpload: any = { url: "" };

    if (file1) {
      imgUpload = await edgestore.publicFiles.upload({
        file: file1,
      });
    }

    if (file2) {
      bannerUpload = await edgestore.publicFiles.upload({
        file: file2,
      });
    }

    try {
      const response = await fetch(`/api/users/${userData._id}/infos`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "user-info",
          items: {
            newName: name,
            newUsername: username,
            newBio: bio,
            newBanner: bannerUpload.url,
            newImg: imgUpload.url,
          },
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchUsers(reFetchUsers + 1);
      closeBtn();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none bg-neutral-800 bg-opacity-70">
      <div className="max-w-[600px] w-[600px] mx-1 bg-black p-5 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl text-white font-bold">Edit your profil</h1>
          <button
            className="text-white text-2xl outline-none border-none cursor-pointer"
            onClick={closeBtn}
          >
            <IoClose />
          </button>
        </div>
        <form onSubmit={updateUserInfo}>
          <div className="flex flex-col justify-center items-center mb-2">
            <h1 className="text-lg text-white font-medium mb-2">Banner</h1>
            <SingleImageDropzone
              width={150}
              height={150}
              value={file2}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setFile2(file);
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
            <h1 className="text-lg text-white font-medium mb-2">Avatar</h1>
            <SingleImageDropzone
              width={150}
              height={150}
              value={file1}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setFile1(file);
              }}
            />
          </div>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserame(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-full text-black font-semibold text-lg bg-white p-2 my-3"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
