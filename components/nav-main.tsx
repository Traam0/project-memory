"use client";

import {
  IconArchive,
  IconCamera,
  IconCirclePlusFilled,
  IconFolder,
  IconListDetails,
  IconMail,
  IconProps,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Vault } from "lucide-react";

const items = [
  {
    title: "Engram",
    url: "#",
    icon: IconArchive,
  },
  {
    title: "Fragments",
    url: "#",
    icon: IconFolder,
  },
  {
    title: "Moments",
    url: "#",
    icon: IconListDetails,
  },
  {
    title: "Personas",
    url: "#",
    icon: IconUsers,
  },
  {
    title: "Vault",
    url: "#",
    icon: Vault,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Upload Moment"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Upload Moment</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconCamera />
              <span className="sr-only">upload to gallery</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
