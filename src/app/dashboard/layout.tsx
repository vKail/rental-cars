import { SideBar } from "@/core/layout/dashboard/side-bar";
import { Footer } from "@/core/layout/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
          <div className="">
          <SideBar />
          </div>
        <div className=" flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
