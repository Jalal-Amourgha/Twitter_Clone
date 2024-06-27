"use client";

import { useAppContext } from "@/context";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface EditProfileProps {
  closeBtn: () => void;
  userData: any;
}

const EditProfile = ({ closeBtn, userData }: EditProfileProps) => {
  const { reFetchUsers, setReFetchUsers } = useAppContext();
  //  const { edgestore } = useEdgeStore();
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();
  const [bannerUrl, setBannertUrl] = useState();
  const [imgUrl, setImgtUrl] = useState();
  const [bannerProgress, setBannerProgress] = useState(0);
  const [imgProgress, setImgProgress] = useState(0);
  const [name, setName] = useState(userData.name);
  const [username, setUserame] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/${userData._id}/infos`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "user-info",
          items: {
            newName: name,
            newUsername: username,
            newBio: bio,
            // banner: bannerUrl,
            // img: imgUrl,
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
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl text-white font-bold">Edit your profil</h1>
          <button
            className="text-white text-2xl outline-none border-none cursor-pointer"
            onClick={closeBtn}
          >
            <IoClose />
          </button>
        </div>
        <form onSubmit={updateUserInfo}>
          {/* <div className="flex flex-col justify-center items-center mb-2">
            <SingleImageDropzone
              width={100}
              height={100}
              value={file1}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setFile1(file);
              }}
            />
            <div className="h-[10px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${bannerProgress}%` }}
              ></div>
            </div>
            <button
              className="bg-black text-white p-1 mt-2 border-[1px] border-dashed rounded-md"
              onClick={async () => {
                if (file1) {
                  const res = await edgestore.myPublicImages.upload({
                    file: file1,
                    onProgressChange: (progress) => {
                      setBannerProgress(progress);
                    },
                  });

                  setBannertUrl(res?.url);
                }
              }}
            >
              Upload
            </button>
          </div> */}
          {/* <div className="flex flex-col justify-center items-center">
            <SingleImageDropzone
              width={100}
              height={100}
              value={file2}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setFile2(file);
              }}
            />
            <div className="h-[10px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${imgProgress}%` }}
              ></div>
            </div>
            <button
              className="bg-black text-white py-1 px-2 mt-2 border-[1px] border-dashed rounded-md"
              onClick={async () => {
                if (file2) {
                  const res = await edgestore.myPublicImages.upload({
                    file: file2,
                    onProgressChange: (progress) => {
                      setImgProgress(progress);
                    },
                  });

                  setImgtUrl(res?.url);
                }
              }}
            >
              Upload
            </button>
          </div> */}
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
