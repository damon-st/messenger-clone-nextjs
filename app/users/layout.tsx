import { getUsers } from "@/actions/get-users";
import { Sidebar } from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";
import { UsersList } from "./_components/user-list";

export default async function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
