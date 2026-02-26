export type TopicStyleType = "tutorial" | "til" | "troubleshooting";
export type GenerateErrorType = "timeout" | "token_limit" | "server";

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

export interface IGeneratedErrorResponse {
  error: string;
  errorType: GenerateErrorType;
}
