"use client";

import { Playlist } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { deletePlaylist } from "@/features/playlists/services/playlist-service";
import { useState } from "react";

interface PlaylistAdminListProps {
  playlists: (Playlist & { _count?: { videos: number } })[];
  locale: string;
}

export function PlaylistAdminList({ playlists, locale }: PlaylistAdminListProps) {
  const t = useTranslations("admin");
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;
    setDeleting(id);
    await deletePlaylist(id);
    setDeleting(null);
  };

  if (playlists.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No playlists yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{playlist.title}</h3>
              <p className="text-sm text-muted-foreground">{playlist._count?.videos ?? 0} videos</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/${locale}/admin/playlists/${playlist.id}/edit`}>{t("editPlaylist")}</Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(playlist.id)}
                disabled={deleting === playlist.id}
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
