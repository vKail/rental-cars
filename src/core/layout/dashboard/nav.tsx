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
    modules: IModule[];
}

export const Nav = ({ modules }: NavParams) => {
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
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarMenu>
          {modules.map((module) => (
            <Collapsible key={module.route} defaultOpen className="group/collapsible">
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
                        <Link href={`/${module.route}/${subModule.name}`}>
                          <SidebarMenuButton>
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
      </SidebarGroup>
    </Sidebar>
  );
};
