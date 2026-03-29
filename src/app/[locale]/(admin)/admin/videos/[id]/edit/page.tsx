import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getVideoById } from "@/features/videos/services/video-service";
import { VideoForm } from "@/features/videos/components/video-form";
import { getPlaylists } from "@/features/playlists/services/playlist-service";
import type { Video, Playlist } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const t = await getTranslations("admin");
  const [video, playlists] = await Promise.all([
    getVideoById(params.id),
    getPlaylists(),
  ]);
  if (!video) notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("editVideo")}</h1>
      <VideoForm video={video as Video} playlists={playlists as Playlist[]} />
    </div>
  );
}
