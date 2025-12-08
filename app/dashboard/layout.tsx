import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { redirect } from "next/navigation";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const session = await auth();
  // const u = await prisma.user.findUnique({
  //   where: { email: session?.user.email! },
  // });

  // if (u?.password == null) redirect("/set-password");
  // console.log(session);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <a href="/dashboard">
                  <IconInnerShadowTop className="size-5!" />
                  <span className="text-base font-semibold">
                    Project Memory.
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          <NavDocuments />
          <NavSecondary className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          {session?.user && (
            <NavUser
              user={{
                name: session.user.name || "Test",
                email: session.user.email || "test@project-memory.studio",
                avatar: session.user.image || "/avatars/shadcn.jpg",
              }}
            />
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
