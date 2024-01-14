"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users: User[];
}

export const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const sliceusers = users?.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0 ",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative size-11">
      {sliceusers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden size-[21px] ${
            positionMap[index as keyof typeof positionMap]
          } `}
        >
          <Image alt="avatar" fill src={user?.image ?? "/placeholder.jpg"} />
        </div>
      ))}
    </div>
  );
};
