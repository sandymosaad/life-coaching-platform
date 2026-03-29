"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema, VideoInput } from "@/lib/validations";
import { createVideo, updateVideo, extractVideoMetadata } from "@/features/videos/services/video-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Video, Playlist } from "@/types";
import { useState } from "react";

interface VideoFormProps {
  video?: Video;
  playlists: Playlist[];
}

export function VideoForm({ video, playlists }: VideoFormProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const locale = useLocale();
  const [detecting, setDetecting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VideoInput>({
    resolver: zodResolver(videoSchema),
    defaultValues: video
      ? {
          title: video.title,
          titleAr: video.titleAr ?? "",
          description: video.description ?? "",
          descriptionAr: video.descriptionAr ?? "",
          videoUrl: video.videoUrl,
          platform: video.platform as "youtube" | "instagram" | "tiktok",
          videoId: video.videoId,
          thumbnail: video.thumbnail ?? "",
          order: video.order,
          playlistId: video.playlistId ?? null,
        }
      : { order: 0, platform: "youtube" },
  });

  const handleDetect = async () => {
    const url = watch("videoUrl");
    if (!url) return;
    setDetecting(true);
    try {
      const meta = await extractVideoMetadata(url);
      setValue("platform", meta.platform as "youtube" | "instagram" | "tiktok");
      setValue("videoId", meta.videoId);
      if (meta.thumbnail) setValue("thumbnail", meta.thumbnail);
    } finally {
      setDetecting(false);
    }
  };

  const onSubmit = async (data: VideoInput) => {
    if (video) {
      await updateVideo(video.id, data);
    } else {
      await createVideo(data);
    }
    router.push(`/${locale}/admin/videos`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="videoUrl">{t("videoUrl")}</Label>
        <div className="flex gap-2">
          <Input id="videoUrl" {...register("videoUrl")} className="flex-1" />
          <Button type="button" variant="outline" onClick={handleDetect} disabled={detecting}>
            {detecting ? "Detecting..." : "Auto-detect"}
          </Button>
        </div>
        {errors.videoUrl && <p className="text-sm text-destructive">{errors.videoUrl.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="platform">{t("platform")}</Label>
          <Select onValueChange={(v) => setValue("platform", v as "youtube" | "instagram" | "tiktok")} defaultValue={video?.platform ?? "youtube"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoId">Video ID</Label>
          <Input id="videoId" {...register("videoId")} />
          {errors.videoId && <p className="text-sm text-destructive">{errors.videoId.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">{t("title")}</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="titleAr">{t("titleAr")}</Label>
        <Input id="titleAr" {...register("titleAr")} dir="rtl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">{t("description")}</Label>
        <Textarea id="description" {...register("description")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="descriptionAr">{t("descriptionAr")}</Label>
        <Textarea id="descriptionAr" {...register("descriptionAr")} dir="rtl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input id="thumbnail" {...register("thumbnail")} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="playlist">{t("playlist")}</Label>
          <Select onValueChange={(v) => setValue("playlistId", v === "none" ? null : v)} defaultValue={video?.playlistId ?? "none"}>
            <SelectTrigger>
              <SelectValue placeholder="Select playlist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {playlists.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">{t("order")}</Label>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : t("save")}
      </Button>
    </form>
  );
}
