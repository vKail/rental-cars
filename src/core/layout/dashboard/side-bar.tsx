"use client";
import { Nav } from "./nav";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { modulesByRole } from "./data/modules";
import { UseAuthStore } from "@/features/auth/context/auth-user-store";
import { useSidebar } from "@/components/ui/sidebar";

export const SideBar = () => {
  const { user } = UseAuthStore();
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const handleToggle = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="relative flex">
      {/* Botón de toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 z-50 lg:hidden"
        onClick={handleToggle}
      >
        {(isMobile ? openMobile : open) ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar con estado del hook useSidebar */}
      <div className={`
        ${(isMobile ? openMobile : open) ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-200 ease-in-out
        fixed top-0 left-0 h-full 
        lg:relative lg:translate-x-0
      `}>
        <Nav
          modules={
            modulesByRole[
              (user?.role as "administrador" | "client" | "employee") ??
                "client"
            ]
          }
        />
      </div>
    </div>
  );
};
