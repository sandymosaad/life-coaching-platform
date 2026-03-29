import { z } from "zod";

export const playlistSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  titleAr: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  descriptionAr: z.string().max(1000).optional(),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().int().min(0).default(0),
});

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  titleAr: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  descriptionAr: z.string().max(2000).optional(),
  videoUrl: z.string().url("Must be a valid URL"),
  platform: z.enum(["youtube", "instagram", "tiktok"]),
  videoId: z.string().min(1, "Video ID is required"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().int().min(0).default(0),
  playlistId: z.string().optional().nullable(),
});

export type PlaylistInput = z.input<typeof playlistSchema>;
export type VideoInput = z.input<typeof videoSchema>;
