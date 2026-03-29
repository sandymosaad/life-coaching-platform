import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVideoId(url: string, platform: string): string {
  if (platform === "youtube") {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }
  if (platform === "instagram") {
    const regex = /instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }
  if (platform === "tiktok") {
    const regex = /tiktok\.com\/@[^/]+\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }
  return "";
}

export function detectPlatform(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com")) return "tiktok";
  return "unknown";
}

export function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
