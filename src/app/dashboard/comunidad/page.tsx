import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommunityFeed } from "@/components/CommunityFeed";

export default async function ComunidadPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId: user.id }, select: { id: true } },
    },
  });

  const serialized = posts.map((p) => ({
    id: p.id,
    content: p.content,
    imageUrl: p.imageUrl,
    createdAt: p.createdAt.toISOString(),
    author: { id: p.user.id, name: p.user.name || "Estudiante", image: p.user.image },
    likesCount: p._count.likes,
    commentsCount: p._count.comments,
    likedByMe: p.likes.length > 0,
  }));

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Comunidad</h1>
        <p className="text-gray-400 text-sm mt-1">Comparte tu progreso con los demás</p>
      </div>
      <CommunityFeed initialPosts={serialized} currentUserId={user.id} currentUserName={user.name || ""} currentUserImage={user.image} />
    </div>
  );
}
