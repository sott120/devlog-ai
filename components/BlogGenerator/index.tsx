"use client";

import { generateBlogPost } from "@/app/actions/generate";
import GeneratorForm from "@/components/BlogGenerator/GeneratorForm";
import { IGeneratedResponse, TopicStyleType } from "@/types";
import { useState } from "react";
import MarkdownEditor from "@/components/BlogGenerator/MarkdownEditor";
import ScrollTopButton from "@/components/BlogGenerator/ScrollTopButton";
import { Loader2 } from "lucide-react";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState<TopicStyleType>("tutorial");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IGeneratedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    const response: IGeneratedResponse | { error: string } = await generateBlogPost({ topic, keywords, style });
    if ("error" in response) {
      setError(response.error);
    } else {
      setResult(response);
    }

    setIsLoading(false);
  };

  const handleClickClear = () => {
    setTopic("");
    setKeywords("");
    setStyle("tutorial");
    setResult(null);
    setError(null);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      <GeneratorForm
        topic={topic}
        keywords={keywords}
        style={style}
        setTopic={setTopic}
        setKeywords={setKeywords}
        setStyle={setStyle}
        isLoading={isLoading}
        handleGenerate={handleGenerate}
        handleClickClear={handleClickClear}
      />
      <MarkdownEditor result={result} error={error} />
      <ScrollTopButton watchValue={result?.content ?? ""} />
    </>
  );
};

export default BlogGenerator;
