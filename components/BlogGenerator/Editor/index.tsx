import { IGeneratedResponse } from "@/types";
import { AlertCircle } from "lucide-react";

interface IEditorProps {
  result: IGeneratedResponse | null;
  error: string | null;
}

const Editor = ({ result, error }: IEditorProps) => {
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <AlertCircle className="size-10" />
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="my-10 text-lg">
        <p className="text-muted-foreground">제목: {result.title}</p>
        <p className="text-muted-foreground">본문: {result.content}</p>
        <p className="text-muted-foreground">해시태그: {result.hashtags.join(", ")}</p>
        <p className="text-muted-foreground">메타 설명: {result.metaDescription}</p>
      </div>
    );
  }
};

export default Editor;
