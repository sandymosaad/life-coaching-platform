/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getVideoById, getVideos } from "@/features/videos/services/video-service";
import { VideoPlayer } from "@/features/videos/components/video-player";
import { VideoCard } from "@/features/videos/components/video-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VideoDetailPage({ params }: { params: { id: string; locale: string } }) {
  const t = await getTranslations("videos");
  const locale = await getLocale();
  const video = await getVideoById(params.id);

  if (!video) notFound();

  const title = locale === "ar" && video.titleAr ? video.titleAr : video.title;
  const description = locale === "ar" && video.descriptionAr ? video.descriptionAr : video.description;

  const playlistVideos = video.playlist?.videos ?? [];
  const currentIndex = playlistVideos.findIndex((v: { id: string }) => v.id === video.id);
  const prevVideo = currentIndex > 0 ? playlistVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex >= 0 && currentIndex < playlistVideos.length - 1 ? playlistVideos[currentIndex + 1] : null;

  const suggestedVideos = await getVideos();
  const suggested = suggestedVideos.filter((v: { id: string }) => v.id !== video.id).slice(0, 4);

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-4">
          <Link href={`/${locale}/videos`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &larr; {t("backToHub")}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer platform={video.platform} videoId={video.videoId} title={title} />
            <div className="mt-6">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
            </div>

            {(prevVideo || nextVideo) && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border/40">
                {prevVideo ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${locale}/videos/${prevVideo.id}`}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      {t("previousVideo")}
                    </Link>
                  </Button>
                ) : <div />}
                {nextVideo && (
                  <Button asChild size="sm">
                    <Link href={`/${locale}/videos/${nextVideo.id}`}>
                      {t("nextVideo")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          <div>
            {suggested.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-4">{t("suggestedVideos")}</h2>
                <div className="space-y-4">
                  {suggested.map((v) => (
                    <VideoCard key={v.id} video={v as any} locale={locale} watchLabel={t("watchVideo")} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
