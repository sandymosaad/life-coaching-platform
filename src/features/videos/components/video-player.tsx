"use client";

interface VideoPlayerProps {
  platform: string;
  videoId: string;
  title: string;
}

export function VideoPlayer({ platform, videoId, title }: VideoPlayerProps) {
  if (platform === "youtube") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (platform === "instagram") {
    return (
      <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`https://www.instagram.com/p/${videoId}/`}
          data-instgrm-version="14"
          style={{ width: "100%", minWidth: "326px" }}
        >
          <div style={{ padding: "16px" }}>
            <a
              href={`https://www.instagram.com/p/${videoId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View on Instagram
            </a>
          </div>
        </blockquote>
      </div>
    );
  }

  if (platform === "tiktok") {
    return (
      <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-lg">
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@balance_wz_haidy/video/${videoId}`}
          data-video-id={videoId}
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          <section>
            <a
              href={`https://www.tiktok.com/@balance_wz_haidy/video/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View on TikTok
            </a>
          </section>
        </blockquote>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center aspect-video w-full rounded-lg bg-muted">
      <span className="text-muted-foreground text-sm">Unsupported platform</span>
    </div>
  );
}
