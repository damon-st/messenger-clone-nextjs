"use client";
import { useActiveList } from "@/hooks/use-active-list";
import { User } from "@prisma/client";
import Image from "next/image";

interface Avatar {
  user: User | null;
}
export const Avatar = ({ user }: Avatar) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden size-9 md:size-11">
        <Image alt="avatar" src={user?.image ?? "/placeholder.jpg"} fill />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 size-2 md:size-3" />
      )}
    </div>
  );
};
