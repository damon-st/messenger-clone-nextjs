import { getConversationById } from "@/actions/get-conversation-byid";
import { getMessages } from "@/actions/get-messages";
import { EmptyState } from "@/components/empty-state";
import { Header } from "./_components/header";
import { Body } from "./_components/body";
import { Form } from "./_components/form";

interface ConversationIdProps {
  conversationId: string;
}
export default async function ConversationId({
  params,
}: {
  params: ConversationIdProps;
}) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col ">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}
