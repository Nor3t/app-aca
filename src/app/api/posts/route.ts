import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "Content required" }, { status: 400 });

  const user = session.user as any;

  const post = await prisma.post.create({
    data: { content: content.trim(), userId: user.id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  return NextResponse.json({
    id: post.id,
    content: post.content,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt.toISOString(),
    author: { id: post.user.id, name: post.user.name || "Estudiante", image: post.user.image },
    likesCount: 0,
    commentsCount: 0,
    likedByMe: false,
  });
}
