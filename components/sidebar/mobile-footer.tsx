"use client";

import { useConversation } from "@/hooks/use-conversations";
import { useRoutes } from "@/hooks/use-routes";
import { MobileItem } from "./mobile-item";

export const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          icon={route.icon}
          key={route.label}
          href={route.href}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};
