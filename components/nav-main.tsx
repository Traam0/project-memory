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
import { useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useToggle } from "@/hooks/use-toggle";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Field, FieldGroup, FieldLabel } from "./ui/field";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Send file to backend
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);
  };
  const [drawerOpen, toggleDrawerOpen] = useToggle();

  return (
    <SidebarGroup>
      {QuickActionDrawer()}
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={toggleDrawerOpen}
              tooltip="Upload Moment"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Upload Moment</span>
            </SidebarMenuButton>
            <Button
              onClick={() => inputRef.current?.click()}
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconCamera />
              <span className="sr-only">upload to gallery</span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*;capture=camera"
                capture="environment" // forces camera first on mobile
                className="hidden"
                onChange={onFileChange}
              />
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

  function QuickActionDrawer() {
    return (
      <Drawer open={drawerOpen} onClose={toggleDrawerOpen}>
        <DrawerContent className="flex flex-col items-center px-12">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <form className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel>Moment</FieldLabel>
                <Input name="moment" type="file" accept="image/*" required />
              </Field>
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  required
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </Field>
            </FieldGroup>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }
}
