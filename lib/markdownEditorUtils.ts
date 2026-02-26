export const getMarkdownEditorFileName = (title: string): string => {
  const normalizedTitle = title.trim().toLowerCase();
  const sanitizedTitle = normalizedTitle
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-_]/g, "")
    .slice(0, 60);

  return sanitizedTitle || "devlog-ai-post";
};

export const downloadMarkdownEditorFile = (fileName: string, fileContent: string, mimeType: string): void => {
  const blob = new Blob([fileContent], { type: mimeType });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};

export const createMarkdownEditorHtmlDocument = (title: string, metaDescription: string, bodyHtml: string): string => {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${metaDescription}" />
</head>
<body>
${bodyHtml}
</body>
</html>`;
};
