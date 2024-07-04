import { FaXTwitter } from "react-icons/fa6";
export const HomeLoading = () => {
  return (
    <div className="fixed top-0 left-0 z-[100] h-screen w-full bg-black text-7xl text-white flex justify-center items-center">
      <FaXTwitter />
    </div>
  );
};

export const UserLoading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="loader"></div>
    </div>
  );
};
