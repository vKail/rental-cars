"use client";

import { AlignJustify, Calendar, CarFront, Filter, LayoutDashboard, List, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { Nav } from './nav';
import { useSidebar } from '@/components/ui/sidebar';
import { modules } from './data/modules';


export const SideBar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    <div className="flex">
      <div className={`
        flex flex-col bg-white transition-all duration-500 ease-in-out border-r 
        ${isClosed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex w-full p-2">
          <button 
            onClick={() => setIsClosed(!isClosed)}
            className={`
              p-2 transition-transform duration-500 ease-in-out
              ${isClosed ? 'rotate-180' : 'rotate-0'}
            `}
          >
            <AlignJustify size={32} />
          </button>
        </div>
        <div className={`
          flex-1  ease-in-out
          ${isClosed ? 'opacity-0 transition-opacity duration-150' : 'opacity-100 transition-opacity duration-500'}
        `}>
          <Nav modules={modules} />
        </div>
      </div>
    </div>
  );
};