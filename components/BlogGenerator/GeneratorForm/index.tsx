"use client";
import { PiStarFourFill, PiTrash } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import StyleSelector from "@/components/BlogGenerator/GeneratorForm/StyleSelector";
import TopicInput from "@/components/BlogGenerator/GeneratorForm/TopicInput";
import KeywordInput from "@/components/BlogGenerator/GeneratorForm/KeywordInput";
import { TopicStyleType } from "@/types";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleGenerate();
  };

  return (
    <div className="my-10 w-full">
      <section className="flex flex-col items-center justify-center p-4">
        <h2 className="text-5xl font-bold">Devlog AI</h2>
        <p className="pt-2 text-lg">개발/IT 기술 블로그 포스팅을 AI에게 맡겨보세요.</p>
      </section>
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center gap-2">
        <StyleSelector value={style} onChange={setStyle} />
        <TopicInput value={topic} onChange={setTopic} />
        <KeywordInput value={keywords} onChange={setKeywords} />
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
            onClick={handleClickClear}
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
