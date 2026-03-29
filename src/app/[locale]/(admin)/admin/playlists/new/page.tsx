import { getTranslations } from "next-intl/server";
import { PlaylistForm } from "@/features/playlists/components/playlist-form";

export default async function NewPlaylistPage() {
  const t = await getTranslations("admin");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("addPlaylist")}</h1>
      <PlaylistForm />
    </div>
  );
}
