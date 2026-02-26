"use client";
import { PiStarFourFill, PiTrash } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import StyleSelector from "@/components/BlogGenerator/GeneratorForm/StyleSelector";
import TopicInput from "@/components/BlogGenerator/GeneratorForm/TopicInput";
import KeywordInput from "@/components/BlogGenerator/GeneratorForm/KeywordInput";
import { TopicStyleType } from "@/types";
import { useState } from "react";

interface IGeneratorFormProps {
  topic: string;
  keywords: string;
  style: TopicStyleType;
  setTopic: (topic: string) => void;
  setKeywords: (keywords: string) => void;
  setStyle: (style: TopicStyleType) => void;
  isLoading: boolean;
  handleGenerate: () => void;
  handleClickClear: () => void;
}

const GeneratorForm = ({
  topic,
  keywords,
  style,
  setTopic,
  setKeywords,
  setStyle,
  isLoading,
  handleGenerate,
  handleClickClear,
}: IGeneratorFormProps) => {
  const [isValidationTried, setIsValidationTried] = useState(false);
  const topicValue = topic.trim();
  const keywordValue = keywords.trim();
  const keywordList = keywordValue
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const hasEmptyKeywordItem = /(^\s*,)|(,\s*$)|(,\s*,)/.test(keywords);
  const hasOverKeywordLength = keywordList.some((item) => item.length > 20);

  const topicErrorMessage =
    topicValue.length === 0 ? "주제를 입력해주세요." : topicValue.length > 200 ? "주제는 200자 이내로 입력해주세요." : "";

  const keywordErrorMessage =
    keywordValue.length === 0
      ? "키워드를 1개 이상 입력해주세요."
      : hasEmptyKeywordItem
        ? "키워드는 쉼표(,)로 구분하고 빈 항목 없이 입력해주세요."
        : keywordList.length === 0
          ? "키워드를 1개 이상 입력해주세요."
          : hasOverKeywordLength
            ? "각 키워드는 20자 이내로 입력해주세요."
            : "";

  const isFormValid = topicErrorMessage.length === 0 && keywordErrorMessage.length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsValidationTried(true);

    if (false === isFormValid || isLoading) {
      return;
    }
    handleGenerate();
  };

  const handleResetForm = (): void => {
    setIsValidationTried(false);
    handleClickClear();
  };

  return (
    <div className="my-10 w-full">
      <section className="flex flex-col items-center justify-center p-4">
        <h2 className="text-5xl font-bold">Devlog AI</h2>
        <p className="pt-2 text-lg">개발/IT 기술 블로그 포스팅을 AI에게 맡겨보세요.</p>
      </section>
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center gap-2">
        <StyleSelector value={style} onChange={setStyle} />
        <TopicInput
          value={topic}
          onChange={setTopic}
          errorMessage={isValidationTried ? topicErrorMessage : ""}
          helperMessage="주제는 200자 이내로 입력할 수 있습니다."
        />
        <KeywordInput
          value={keywords}
          onChange={setKeywords}
          errorMessage={isValidationTried ? keywordErrorMessage : ""}
          helperMessage="예: React, Hooks, 상태관리"
        />
        <div className="m-4 flex w-full max-w-lg gap-2">
          <Button className="h-12 flex-1" type="submit" disabled={isLoading}>
            생성하기
            <PiStarFourFill />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
            type="button"
            onClick={handleResetForm}
            disabled={isLoading}
          >
            <PiTrash className="size-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneratorForm;
