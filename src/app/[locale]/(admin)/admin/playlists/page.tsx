/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getPlaylists } from "@/features/playlists/services/playlist-service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaylistAdminList } from "@/features/playlists/components/playlist-admin-list";

export const dynamic = "force-dynamic";

export default async function AdminPlaylistsPage() {
  const t = await getTranslations("admin");
  const locale = await getLocale();
  const playlists = await getPlaylists();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t("playlists")}</h1>
        <Button asChild>
          <Link href={`/${locale}/admin/playlists/new`}>{t("addPlaylist")}</Link>
        </Button>
      </div>
      <PlaylistAdminList playlists={playlists as any} locale={locale} />
    </div>
  );
}
