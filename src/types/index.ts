export interface Playlist {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  coverImage: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  videos?: Video[];
  _count?: { videos: number };
}

export interface Video {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  videoUrl: string;
  platform: string;
  videoId: string;
  thumbnail: string | null;
  order: number;
  playlistId: string | null;
  playlist?: Playlist | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Locale = "en" | "ar";
