import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getVideos } from "@/features/videos/services/video-service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoAdminList } from "@/features/videos/components/video-admin-list";
import type { Video } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const t = await getTranslations("admin");
  const locale = await getLocale();
  const videos = await getVideos();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t("videos")}</h1>
        <Button asChild>
          <Link href={`/${locale}/admin/videos/new`}>{t("addVideo")}</Link>
        </Button>
      </div>
      <VideoAdminList videos={videos as Video[]} locale={locale} />
    </div>
  );
}
