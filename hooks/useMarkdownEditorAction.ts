import { type MutableRefObject, useState } from "react";
import type ToastEditor from "@toast-ui/editor";
import { IGeneratedResponse } from "@/types";
import {
  createMarkdownEditorHtmlDocument,
  downloadMarkdownEditorFile,
  getMarkdownEditorFileName,
} from "@/lib/markdownEditorUtils";

interface IUseMarkdownEditorActionParams {
  editorRef: MutableRefObject<ToastEditor | null>;
  result: IGeneratedResponse | null;
}

export const useMarkdownEditorAction = (params: IUseMarkdownEditorActionParams) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyMarkdown = async (): Promise<void> => {
    if (null === params.editorRef.current) {
      return;
    }

    await navigator.clipboard.writeText(params.editorRef.current.getMarkdown());
    setIsCopied(true);

    window.setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  };

  const handleDownloadMarkdown = (): void => {
    if (null === params.result || null === params.editorRef.current) {
      return;
    }

    const fileName = `${getMarkdownEditorFileName(params.result.title)}.md`;
    downloadMarkdownEditorFile(fileName, params.editorRef.current.getMarkdown(), "text/markdown;charset=utf-8");
  };

  const handleDownloadHtml = (): void => {
    if (null === params.result || null === params.editorRef.current) {
      return;
    }

    const fileName = `${getMarkdownEditorFileName(params.result.title)}.html`;
    const bodyHtml = params.editorRef.current.getHTML();
    const documentHtml = createMarkdownEditorHtmlDocument(params.result.title, params.result.metaDescription, bodyHtml);

    downloadMarkdownEditorFile(fileName, documentHtml, "text/html;charset=utf-8");
  };

  return {
    isCopied,
    handleCopyMarkdown,
    handleDownloadMarkdown,
    handleDownloadHtml,
  };
};
