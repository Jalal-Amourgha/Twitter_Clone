"use client";
import { useAppContext } from "@/context";
import FollowBar from "./Followbar";
import { MobileSidebar, Sidebar } from "./Sidebar";
import UserIcon from "./UserIcon";
import EditPost from "./EditPost";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { editPost } = useAppContext();
  return (
    <div className="h-screen bg-black overflow-x-hidden overflow-y-scroll">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid md:grid-cols-4 h-full">
          <div className="hidden md:block h-full w-full">
            <div className="sticky top-0 left-0 h-screen w-full flex flex-col justify-between ">
              <Sidebar />
              <UserIcon />
            </div>
          </div>

          <div className="h-full col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
      <MobileSidebar />
      {editPost.visibility ? (
        <EditPost post={editPost.post} postId={editPost.postId} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Layout;
