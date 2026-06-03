import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop sidebar */}
      <Sidebar user={session.user as any} />

      {/* Main content */}
      <main className="flex-1 ml-0 lg:ml-64 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
