export type TopicStyleType = "tutorial" | "til" | "troubleshooting";

export interface IGeneratedRequest {
  topic: string;
  keywords: string;
  style: TopicStyleType;
}

export interface IGeneratedResponse {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}
