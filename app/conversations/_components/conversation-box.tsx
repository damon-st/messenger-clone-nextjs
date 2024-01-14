"use client";

import { FullConversationType } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useOtherUser } from "@/hooks/use-other-user";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/avatar";
import { AvatarGroup } from "@/components/avatar-group";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

export const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otheruser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);
  const lastMessage = useMemo(() => {
    const message = data.messages ?? [];
    return message[message.length - 1];
  }, [data.messages]);
  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    if (!userEmail) {
      return false;
    }
    const seenArray = lastMessage.seen ?? [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lasMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent and image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otheruser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name ?? otheruser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={cn(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lasMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
