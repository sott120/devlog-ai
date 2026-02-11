"use server";

import OpenAI from "openai";
import { getSystemPrompt, getUserPrompt } from "@/lib/prompts";
import { IGeneratedRequest, IGeneratedResponse } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPost({
  topic,
  keywords,
  style,
}: IGeneratedRequest): Promise<IGeneratedResponse | { error: string }> {
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
  } catch (error) {
    console.error("Generate Error:", error);
    return { error: "글 생성에 실패했습니다." };
  }
}
