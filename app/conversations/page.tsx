"use client";

import { EmptyState } from "@/components/empty-state";
import { useConversation } from "@/hooks/use-conversations";
import { cn } from "@/lib/utils";

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={cn("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};
export default Home;
