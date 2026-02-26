"use server";

import OpenAI from "openai";
import { getSystemPrompt, getUserPrompt } from "@/lib/prompts";
import { IGeneratedErrorResponse, IGeneratedRequest, IGeneratedResponse } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPost({
  topic,
  keywords,
  style,
}: IGeneratedRequest): Promise<IGeneratedResponse | IGeneratedErrorResponse> {
  try {
    const systemPrompt = getSystemPrompt(style);
    const userPrompt = getUserPrompt(topic, keywords);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    const result: IGeneratedResponse = JSON.parse(content || "{}");

    return result;
  } catch (error: unknown) {
    console.error("Generate Error:", error);

    const unknownError = error as {
      status?: number;
      code?: string;
      type?: string;
      message?: string;
    };

    if (unknownError?.status === 400 && unknownError?.code === "context_length_exceeded") {
      return {
        error: "입력한 내용이 너무 길어 생성할 수 없습니다. 주제/키워드를 더 간결하게 입력해주세요.",
        errorType: "token_limit",
      };
    }

    if (unknownError?.status === 429 || unknownError?.code === "rate_limit_exceeded") {
      return {
        error: "요청이 많아 잠시 처리할 수 없습니다. 잠시 후 다시 시도해주세요.",
        errorType: "server",
      };
    }

    return {
      error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      errorType: "server",
    };
  }
}
