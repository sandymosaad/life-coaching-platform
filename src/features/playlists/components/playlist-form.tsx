"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playlistSchema, PlaylistInput } from "@/lib/validations";
import { createPlaylist, updatePlaylist } from "@/features/playlists/services/playlist-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Playlist } from "@/types";

interface PlaylistFormProps {
  playlist?: Playlist;
}

export function PlaylistForm({ playlist }: PlaylistFormProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlaylistInput>({
    resolver: zodResolver(playlistSchema),
    defaultValues: playlist
      ? {
          title: playlist.title,
          titleAr: playlist.titleAr ?? "",
          description: playlist.description ?? "",
          descriptionAr: playlist.descriptionAr ?? "",
          coverImage: playlist.coverImage ?? "",
          order: playlist.order,
        }
      : { order: 0 },
  });

  const onSubmit = async (data: PlaylistInput) => {
    if (playlist) {
      await updatePlaylist(playlist.id, data);
    } else {
      await createPlaylist(data);
    }
    router.push(`/${locale}/admin/playlists`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
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
        <Label htmlFor="coverImage">{t("coverImage")}</Label>
        <Input id="coverImage" {...register("coverImage")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order">{t("order")}</Label>
        <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : t("save")}
      </Button>
    </form>
  );
}
