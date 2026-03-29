import { getTranslations } from "next-intl/server";
import { VideoForm } from "@/features/videos/components/video-form";
import { getPlaylists } from "@/features/playlists/services/playlist-service";
import type { Playlist } from "@/types";

export const dynamic = "force-dynamic";

export default async function NewVideoPage() {
  const t = await getTranslations("admin");
  const playlists = await getPlaylists();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("addVideo")}</h1>
      <VideoForm playlists={playlists as Playlist[]} />
    </div>
  );
}
