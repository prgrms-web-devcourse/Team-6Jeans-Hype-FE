export interface ValuesType {
  musicInfo: MusicInfo | string;
  description: string;
  battleAvailability: boolean;
}

export interface MusicInfo {
  trackId: string;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
}

export interface KeywordInfo {
  trackName: string;
  artistName: string;
}
