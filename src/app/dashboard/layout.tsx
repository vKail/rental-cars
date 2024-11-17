import { SideBar } from "@/core/layout/dashboard/side-bar";
import { Footer } from "@/core/layout/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="flex p-0">
          <SideBar />
        </div>
        {/* Main content */}
        <div className="flex flex-1 p-4 justify-center">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
