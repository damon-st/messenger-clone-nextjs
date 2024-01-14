import { getCurrentUser } from "@/actions/get-current-user";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await req.json();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[ERROR_SETTINGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
