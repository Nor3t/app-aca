import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  const { name, bio } = await req.json();

  await prisma.user.update({
    where: { id: user.id },
    data: { name, bio },
  });

  return NextResponse.json({ ok: true });
}
