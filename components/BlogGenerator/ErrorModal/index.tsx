"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface IErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ isOpen, title, message, onClose }: IErrorModalProps) => {
  useEffect(() => {
    if (false === isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (false === isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{message}</p>
        <div className="mt-6 flex justify-end">
          <Button type="button" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ErrorModal;
