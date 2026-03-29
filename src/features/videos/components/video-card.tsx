import Image from "next/image";
import Link from "next/link";
import { Video } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: Video;
  locale: string;
  watchLabel: string;
}

export function VideoCard({ video, locale, watchLabel }: VideoCardProps) {
  const title = locale === "ar" && video.titleAr ? video.titleAr : video.title;
  const description = locale === "ar" && video.descriptionAr ? video.descriptionAr : video.description;

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <Link href={`/${locale}/videos/${video.id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="rounded-full bg-white/90 p-3">
              <Play className="h-6 w-6 text-black fill-black" />
            </div>
          </div>
          <Badge className="absolute top-2 right-2 capitalize text-xs" variant="secondary">
            {video.platform}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}
          <span className="mt-3 inline-block text-xs font-medium text-primary">{watchLabel}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
