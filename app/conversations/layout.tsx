import { Sidebar } from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import { ConversaionList } from "./_components/conversation-list";
import { getConversations } from "@/actions/get-conversations";
import { getUsers } from "@/actions/get-users";

export default async function ConversationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversaionList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
