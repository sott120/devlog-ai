"use client";

import { useRef } from "react";
import type ToastEditor from "@toast-ui/editor";
import { AlertCircle, Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IGeneratedResponse } from "@/types";
import { useMarkdownEditorInstance } from "@/hooks/useMarkdownEditorInstance";
import { useMarkdownEditorAction } from "@/hooks/useMarkdownEditorAction";

interface IEditorProps {
  result: IGeneratedResponse | null;
  error: string | null;
}

const MarkdownEditor = ({ result, error }: IEditorProps) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<ToastEditor | null>(null);
  useMarkdownEditorInstance({ result, editorContainerRef, editorRef });

  const { isCopied, handleCopyMarkdown, handleDownloadMarkdown, handleDownloadHtml } = useMarkdownEditorAction({
    result,
    editorRef,
  });

  if (error) {
    return (
      <section className="mt-6 flex w-full items-center gap-3 rounded-lg border border-red-300 bg-red-50 p-4">
        <AlertCircle className="size-5 text-red-600" />
        <p className="text-sm text-red-700">{error}</p>
      </section>
    );
  }

  if (null === result) {
    return null;
  }

  return (
    <section className="mt-6 mb-10 flex w-full flex-col gap-4">
      <div className="rounded-lg border border-zinc-200 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{result.title}</p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{result.metaDescription}</p>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">#{result.hashtags.join(" #")}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={handleCopyMarkdown}>
          {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {isCopied ? "복사됨" : "마크다운 복사"}
        </Button>
        <Button type="button" variant="outline" onClick={handleDownloadMarkdown}>
          <Download className="size-4" />
          MD 다운로드
        </Button>
        <Button type="button" variant="outline" onClick={handleDownloadHtml}>
          <Download className="size-4" />
          HTML 다운로드
        </Button>
      </div>

      <div className="rounded-lg border bg-white/70 p-2">
        <p className="px-2 py-1 text-xs font-medium">마크다운 편집/프리뷰</p>
        <div ref={editorContainerRef} />
      </div>
    </section>
  );
};

export default MarkdownEditor;
