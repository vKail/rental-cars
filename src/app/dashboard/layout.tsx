import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/core/layout/dashboard/side-bar";
import { Footer } from "@/core/layout/footer";
import { NavBar } from "@/core/layout/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-1">
          <div className="">
          <SideBar />
          </div>
        <div className=" flex-1 p-4">
          <NavBar />
          {children}
          </div>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
