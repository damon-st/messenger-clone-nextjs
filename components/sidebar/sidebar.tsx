import { ReactNode } from "react";
import { DekstopSidebar } from "./desktop-sidebar";
import { MobileFooter } from "./mobile-footer";
import { getCurrentUser } from "@/actions/get-current-user";

interface SidebarProps {
  children: ReactNode;
}
export const Sidebar = async ({ children }: SidebarProps) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DekstopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};
