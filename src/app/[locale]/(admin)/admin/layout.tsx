import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("admin");
  const locale = await getLocale();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border/40 bg-card p-6 hidden md:block">
        <Link href={`/${locale}`} className="font-bold text-lg text-primary block mb-8">
          Balance
        </Link>
        <nav className="space-y-1">
          <Link href={`/${locale}/admin`} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            {t("dashboard")}
          </Link>
          <Link href={`/${locale}/admin/playlists`} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            {t("playlists")}
          </Link>
          <Link href={`/${locale}/admin/videos`} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            {t("videos")}
          </Link>
        </nav>
      </aside>
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
