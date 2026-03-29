"use server";

import { prisma } from "@/lib/db";
import { playlistSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getPlaylists() {
  return prisma.playlist.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { videos: true } } },
  });
}

export async function getPlaylistById(id: string) {
  return prisma.playlist.findUnique({
    where: { id },
    include: { videos: { orderBy: { order: "asc" } } },
  });
}

export async function createPlaylist(data: z.input<typeof playlistSchema>) {
  const validated = playlistSchema.parse(data);
  const playlist = await prisma.playlist.create({ data: validated });
  revalidatePath("/[locale]/(public)/videos", "page");
  return playlist;
}

export async function updatePlaylist(id: string, data: z.input<typeof playlistSchema>) {
  const validated = playlistSchema.parse(data);
  const playlist = await prisma.playlist.update({ where: { id }, data: validated });
  revalidatePath("/[locale]/(public)/videos", "page");
  return playlist;
}

export async function deletePlaylist(id: string) {
  await prisma.playlist.delete({ where: { id } });
  revalidatePath("/[locale]/(public)/videos", "page");
}
