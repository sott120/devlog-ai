import { basePrompt } from "./base";
import { tutorialPrompt } from "./tutorial";
import { tilPrompt } from "./til";
import { troubleshootingPrompt } from "./troubleshooting";

const styleGuides: Record<string, string> = {
  tutorial: tutorialPrompt,
  til: tilPrompt,
  troubleshooting: troubleshootingPrompt,
};

export function getSystemPrompt(style: string): string {
  return basePrompt + (styleGuides[style] || styleGuides.tutorial);
}

export function getUserPrompt(topic: string, keywords: string): string {
  return `
주제: ${topic}
키워드: ${keywords}

위 주제와 키워드를 바탕으로 기술 블로그 글을 작성해주세요.
`;
}
