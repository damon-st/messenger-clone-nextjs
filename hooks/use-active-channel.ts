import { useEffect, useState } from "react";
import { useActiveList } from "./use-active-list";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

export const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannerl] = useState<Channel | null>();

  useEffect(() => {
    let channel = activeChannel;
    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannerl(channel);
    }
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMemebr: string[] = [];
      members.each((memeber: Record<string, any>) =>
        initialMemebr.push(memeber.id)
      );
      set(initialMemebr);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });
  }, [activeChannel, add, remove, set]);
};
