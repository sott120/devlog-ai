import { type MutableRefObject, useEffect } from "react";
import type ToastEditor from "@toast-ui/editor";
import { IGeneratedResponse } from "@/types";

interface IUseMarkdownEditorInstanceParams {
  editorContainerRef: MutableRefObject<HTMLDivElement | null>;
  editorRef: MutableRefObject<ToastEditor | null>;
  result: IGeneratedResponse | null;
}

export const useMarkdownEditorInstance = (params: IUseMarkdownEditorInstanceParams): void => {
  const { editorContainerRef, editorRef, result } = params;

  useEffect(() => {
    if (null === result || null === editorContainerRef.current || null !== editorRef.current) {
      return;
    }

    let isUnmounted = false;
    let cleanupEditor = (): void => {};

    const initializeEditor = async (): Promise<void> => {
      const [{ default: ToastEditorRuntime }, { default: codeSyntaxHighlight }, { default: Prism }] = await Promise.all([
        import("@toast-ui/editor"),
        import("@toast-ui/editor-plugin-code-syntax-highlight"),
        import("prismjs"),
      ]);

      if (isUnmounted || null === editorContainerRef.current || null !== editorRef.current) {
        return;
      }

      const pluginList = [[codeSyntaxHighlight, { highlighter: Prism }]];

      editorRef.current = new ToastEditorRuntime({
        el: editorContainerRef.current,
        initialValue: result.content,
        initialEditType: "markdown",
        previewStyle: window.innerWidth < 1024 ? "tab" : "vertical",
        height: "520px",
        usageStatistics: false,
        plugins: pluginList,
      });

      const handleResize = (): void => {
        if (null === editorRef.current) {
          return;
        }

        if (window.innerWidth < 1024) {
          editorRef.current.changePreviewStyle("tab");
          return;
        }

        editorRef.current.changePreviewStyle("vertical");
      };

      window.addEventListener("resize", handleResize);

      cleanupEditor = (): void => {
        window.removeEventListener("resize", handleResize);
        editorRef.current?.destroy();
        editorRef.current = null;
      };
    };

    void initializeEditor();

    return () => {
      isUnmounted = true;
      cleanupEditor();
    };
  }, [editorContainerRef, editorRef, result]);

  useEffect(() => {
    if (null === result || null === editorRef.current) {
      return;
    }

    editorRef.current.setMarkdown(result.content);
  }, [editorRef, result]);
};
