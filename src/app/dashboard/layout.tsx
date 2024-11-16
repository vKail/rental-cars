import { SideBar } from "@/core/layout/dashboard/side-bar";
import { Footer } from "@/core/layout/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-wrap ">
        <div className="flex  p-0">
          <SideBar />
        </div>
        <div className="flex  p-4">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
