/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getPlaylists } from "@/features/playlists/services/playlist-service";
import { getVideos } from "@/features/videos/services/video-service";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import { VideoCard } from "@/features/videos/components/video-card";

export const dynamic = "force-dynamic";

export default async function VideosPage({
  searchParams,
}: {
  searchParams: { playlist?: string };
}) {
  const t = await getTranslations("videos");
  const locale = await getLocale();
  const [playlists, videos] = await Promise.all([
    getPlaylists(),
    getVideos(searchParams.playlist),
  ]);

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground mb-2">{t("subtitle")}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("intro")}</p>
        </div>

        {playlists.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t("allPlaylists")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist as any}
                  locale={locale}
                  startLabel={t("startSeries")}
                  videosCount={(playlist as any)._count?.videos}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">{t("allVideos")}</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video as any}
                  locale={locale}
                  watchLabel={t("watchVideo")}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>{t("noVideos")}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
