"use client";
import { User } from "@prisma/client";
import { UserBox } from "./user-box";

interface UsersListProps {
  items: Array<User>;
}
export const UsersList = ({ items }: UsersListProps) => {
  return (
    <>
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-auto border-b border-gray-200 w-full left-0">
        <div className="px-5">
          <div className="flex-col">
            <div className="text-2xl font-bold text-neutral-800 py-4">
              People
            </div>
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </>
  );
};
