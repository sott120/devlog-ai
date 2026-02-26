"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IScrollTopButtonProps {
  watchValue: string;
}

const ScrollTopButton = ({ watchValue }: IScrollTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = (): void => {
      const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const isScrollable = documentHeight > window.innerHeight;
      setIsVisible(isScrollable);
    };

    updateVisibility();
    const timeoutId = window.setTimeout(updateVisibility, 120);
    const animationFrameId = window.requestAnimationFrame(updateVisibility);

    window.addEventListener("resize", updateVisibility);
    window.addEventListener("scroll", updateVisibility, { passive: true });

    const mutationObserver = new MutationObserver(updateVisibility);
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateVisibility);
      window.removeEventListener("scroll", updateVisibility);
      mutationObserver.disconnect();
    };
  }, [watchValue]);

  const handleMoveTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (false === isVisible) {
    return null;
  }

  return (
    <Button
      type="button"
      size="icon"
      className="fixed right-6 bottom-6 z-50 h-11 w-11 rounded-full shadow-lg"
      onClick={handleMoveTop}
      aria-label="페이지 상단으로 이동"
    >
      <ArrowUp className="size-5" />
    </Button>
  );
};

export default ScrollTopButton;
