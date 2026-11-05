export type ExperienceVideo =
  | {
      id: string;
      title: string;
      description: string;
      source: "file";
      src: string;
      poster?: string;
      captions?: string;
      mimeType?: "video/mp4" | "video/webm";
    }
  | {
      id: string;
      title: string;
      description: string;
      source: "youtube";
      youtubeId: string;
    };

export type ExperienceComment = {
  id: string;
  author: string;
  text: string;
  context?: string;
  relatedVideoId?: string;
  approved: boolean;
  consentToPublish: boolean;
};

/**
 * Content for "La experiencia Equilibria Beauty".
 * Add only real videos with publishing rights and comments with explicit consent.
 * Video files: public/videos/name.mp4 -> src "/videos/name.mp4".
 * YouTube: supply the ID only, not the whole URL.
 * The empty arrays render an honest "Próximamente" state.
 */
export const experienceVideos: ExperienceVideo[] = [];

export const experienceComments: ExperienceComment[] = [];
