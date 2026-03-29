"use client";

import { Video } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { deleteVideo } from "@/features/videos/services/video-service";
import { useState } from "react";

interface VideoAdminListProps {
  videos: Video[];
  locale: string;
}

export function VideoAdminList({ videos, locale }: VideoAdminListProps) {
  const t = useTranslations("admin");
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;
    setDeleting(id);
    await deleteVideo(id);
    setDeleting(null);
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No videos yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card key={video.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{video.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="capitalize text-xs">{video.platform}</Badge>
                <span className="text-xs text-muted-foreground">{video.videoId}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/${locale}/admin/videos/${video.id}/edit`}>{t("editVideo")}</Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(video.id)}
                disabled={deleting === video.id}
              >
                {t("delete")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
