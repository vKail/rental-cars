"use client";

import { IModule } from '@/shared/interfaces/IModule';
import Image from "next/image";
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavParams {
    modules: IModule[]
}

export const Nav = ({modules} : NavParams) => {
  return (
    <Sidebar>
        <Image
            src="/images/logo.png"
            alt="Principal logo for Rental Cars App"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
      <SidebarGroupLabel>Application</SidebarGroupLabel>
    <SidebarMenu>
      {modules.map((module) => (
        <Collapsible key={module.name} defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <module.icon className="mr-2" />
                {module.label}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {module.subModules.map((subModule) => (
                  <SidebarMenuSubItem key={subModule.name}>
                    <Link href={`/dashboard/${module.name.toLowerCase()}/${subModule.name}`}>
                      <SidebarMenuButton>
                        {/* Add the icon and label for submodules */}
                          <subModule.icon className="mr-2" />
                        {subModule.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  </Sidebar>
  );
};
