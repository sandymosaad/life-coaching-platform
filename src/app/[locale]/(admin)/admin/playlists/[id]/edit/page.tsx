import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPlaylistById } from "@/features/playlists/services/playlist-service";
import { PlaylistForm } from "@/features/playlists/components/playlist-form";
import type { Playlist } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditPlaylistPage({ params }: { params: { id: string } }) {
  const t = await getTranslations("admin");
  const playlist = await getPlaylistById(params.id);
  if (!playlist) notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("editPlaylist")}</h1>
      <PlaylistForm playlist={playlist as Playlist} />
    </div>
  );
}
