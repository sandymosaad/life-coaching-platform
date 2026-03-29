import Image from "next/image";
import Link from "next/link";
import { Playlist } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
  locale: string;
  startLabel: string;
  videosCount?: number;
}

export function PlaylistCard({ playlist, locale, startLabel, videosCount }: PlaylistCardProps) {
  const title = locale === "ar" && playlist.titleAr ? playlist.titleAr : playlist.title;
  const description = locale === "ar" && playlist.descriptionAr ? playlist.descriptionAr : playlist.description;

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <Link href={`/${locale}/videos?playlist=${playlist.id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          {playlist.coverImage ? (
            <Image
              src={playlist.coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <PlayCircle className="h-16 w-16 text-primary/50" />
            </div>
          )}
          {videosCount !== undefined && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {videosCount} videos
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}
          <span className="mt-3 inline-block text-sm font-medium text-primary">{startLabel}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
