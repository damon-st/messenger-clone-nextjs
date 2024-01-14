import { getCurrentUser } from "@/actions/get-current-user";
import { db } from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //Find the existing conversation
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invilid ID", { status: 400 });
    }

    //find the las message

    const lasMessage = conversation.messages[conversation.messages.length - 1];
    if (!lasMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen of last message

    const updatedMessage = await db.message.update({
      where: {
        id: lasMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    await pusherServer.trigger(currentUser.email!, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lasMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log("[ERROR_SEE_CONVERSATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
