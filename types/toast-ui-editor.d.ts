declare module "@toast-ui/editor" {
  type PreviewStyle = "tab" | "vertical";
  type InitialEditType = "markdown" | "wysiwyg";

  interface EditorOptions {
    el: HTMLElement;
    initialValue?: string;
    initialEditType?: InitialEditType;
    previewStyle?: PreviewStyle;
    height?: string;
    usageStatistics?: boolean;
    plugins?: unknown[];
  }

  export default class Editor {
    constructor(options: EditorOptions);
    setMarkdown(markdown: string): void;
    getMarkdown(): string;
    getHTML(): string;
    changePreviewStyle(style: PreviewStyle): void;
    on(eventName: string, handler: () => void): void;
    destroy(): void;
  }
}

declare module "@toast-ui/editor-plugin-code-syntax-highlight" {
  const plugin: unknown;
  export default plugin;
}
