"use client";

import { generateBlogPost } from "@/app/actions/generate";
import ErrorModal from "@/components/BlogGenerator/ErrorModal";
import GeneratorForm from "@/components/BlogGenerator/GeneratorForm";
import { GenerateErrorType, IGeneratedErrorResponse, IGeneratedResponse, TopicStyleType } from "@/types";
import { useRef, useState } from "react";
import MarkdownEditor from "@/components/BlogGenerator/MarkdownEditor";
import ScrollTopButton from "@/components/BlogGenerator/ScrollTopButton";
import { Loader2 } from "lucide-react";

const GENERATE_TIMEOUT_MS = 30000;

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState<TopicStyleType>("tutorial");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IGeneratedResponse | null>(null);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const requestCountRef = useRef(0);

  const openErrorModal = (errorType: GenerateErrorType, message: string): void => {
    const titleByErrorType: Record<GenerateErrorType, string> = {
      timeout: "요청 시간 초과",
      token_limit: "입력 길이 초과",
      server: "서버 오류",
    };

    setErrorModal({
      isOpen: true,
      title: titleByErrorType[errorType],
      message,
    });
  };

  const handleGenerate = async (): Promise<void> => {
    const currentRequestCount = requestCountRef.current + 1;
    requestCountRef.current = currentRequestCount;

    setIsLoading(true);
    setResult(null);

    let timeoutId = 0;
    const timeoutPromise = new Promise<IGeneratedErrorResponse>((resolve) => {
      timeoutId = window.setTimeout(() => {
        resolve({
          error: "응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
          errorType: "timeout",
        });
      }, GENERATE_TIMEOUT_MS);
    });

    const response = await Promise.race([generateBlogPost({ topic, keywords, style }), timeoutPromise]);

    window.clearTimeout(timeoutId);

    if (requestCountRef.current !== currentRequestCount) {
      return;
    }

    if ("error" in response) {
      openErrorModal(response.errorType, response.error);
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
      <MarkdownEditor result={result} error={null} />
      <ScrollTopButton watchValue={result?.content ?? ""} />
      <ErrorModal
        isOpen={errorModal.isOpen}
        title={errorModal.title}
        message={errorModal.message}
        onClose={() => setErrorModal({ isOpen: false, title: "", message: "" })}
      />
    </>
  );
};

export default BlogGenerator;
