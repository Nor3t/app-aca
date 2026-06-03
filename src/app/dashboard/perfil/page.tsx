import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/ProfileForm";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user as any;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, image: true, bio: true, createdAt: true },
  });

  return (
    <div className="p-6 lg:p-10 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mi Perfil</h1>
        <p className="text-gray-400 text-sm mt-1">Personaliza tu información</p>
      </div>
      {dbUser && <ProfileForm user={dbUser} />}
    </div>
  );
}
