"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareProductButtonProps {
  productName: string;
  productUrl: string;
  className?: string;
  variant?: "icon" | "full";
}

export function ShareProductButton({
  productName,
  productUrl,
  className,
  variant = "full",
}: ShareProductButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: productName,
      text: `Check out ${productName}`,
      url: productUrl,
    };

    // Use Web Share API on supported devices (mobile)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled — fall through to clipboard copy
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: prompt
      window.prompt("Copy the link below:", productUrl);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => void handleShare()}
        aria-label="Share product"
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-brand-maroon hover:text-brand-maroon",
          className,
        )}
      >
        {copied ? (
          <Check className="size-4 text-brand-green" />
        ) : (
          <Share2 className="size-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void handleShare()}
      aria-label="Share product"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-secondary bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-brand-maroon hover:text-brand-maroon",
        copied && "border-brand-green text-brand-green",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="size-4" />
          Link copied!
        </>
      ) : (
        <>
          <Share2 className="size-4" />
          Share
        </>
      )}
    </button>
  );
}
