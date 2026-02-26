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
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      setIsVisible(isScrollable);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("resize", updateVisibility);
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
