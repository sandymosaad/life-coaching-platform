"use server";

import { prisma } from "@/lib/db";
import { videoSchema } from "@/lib/validations";
import { detectPlatform, extractVideoId, getYoutubeThumbnail } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getVideos(playlistId?: string) {
  return prisma.video.findMany({
    where: playlistId ? { playlistId } : {},
    include: { playlist: true },
    orderBy: [{ playlistId: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getVideoById(id: string) {
  return prisma.video.findUnique({
    where: { id },
    include: { playlist: { include: { videos: { orderBy: { order: "asc" } } } } },
  });
}

export async function createVideo(data: z.input<typeof videoSchema>) {
  const validated = videoSchema.parse(data);
  const video = await prisma.video.create({ data: validated });
  revalidatePath("/[locale]/(public)/videos", "page");
  return video;
}

export async function updateVideo(id: string, data: z.input<typeof videoSchema>) {
  const validated = videoSchema.parse(data);
  const video = await prisma.video.update({ where: { id }, data: validated });
  revalidatePath("/[locale]/(public)/videos", "page");
  return video;
}

export async function deleteVideo(id: string) {
  await prisma.video.delete({ where: { id } });
  revalidatePath("/[locale]/(public)/videos", "page");
}

export async function extractVideoMetadata(url: string) {
  const platform = detectPlatform(url);
  const videoId = extractVideoId(url, platform);
  let thumbnail = "";
  if (platform === "youtube" && videoId) {
    thumbnail = getYoutubeThumbnail(videoId);
  }
  return { platform, videoId, thumbnail };
}
