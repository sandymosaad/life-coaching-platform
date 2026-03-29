/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { getPlaylists } from "@/features/playlists/services/playlist-service";
import { getVideos } from "@/features/videos/services/video-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const t = await getTranslations("admin");
  const locale = await getLocale();
  const [playlists, videos] = await Promise.all([getPlaylists(), getVideos()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("totalPlaylists")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{playlists.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("totalVideos")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{videos.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t("playlists")}</CardTitle>
            <Button asChild size="sm">
              <Link href={`/${locale}/admin/playlists`}>{t("manageContent")}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {playlists.slice(0, 5).map((p: { id: string; title: string }) => (
                <div key={p.id} className="text-sm text-muted-foreground py-1 border-b border-border/40 last:border-0">
                  {p.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t("recentVideos")}</CardTitle>
            <Button asChild size="sm">
              <Link href={`/${locale}/admin/videos`}>{t("manageContent")}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {videos.slice(0, 5).map((v: { id: string; title: string }) => (
                <div key={v.id} className="text-sm text-muted-foreground py-1 border-b border-border/40 last:border-0">
                  {v.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
