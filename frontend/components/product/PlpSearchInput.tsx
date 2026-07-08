"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlpSearchInputProps {
  placeholder?: string;
  basePath?: string;
}

export function PlpSearchInput({
  placeholder = "Search for sweets...",
  basePath = "/products",
}: PlpSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const q = searchParams.get("q") ?? "";
  const [value, setValue] = useState(q);
  
  // To handle debounced search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== q) {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        params.delete("page"); // Reset page on new search
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 400); // 400ms debounce
    
    return () => clearTimeout(timer);
  }, [value, q, pathname, router, searchParams]);

  useEffect(() => {
    setValue(q);
  }, [q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-1 items-center">
      <Search className="absolute left-5 size-[18px] text-[#8a7a6a]" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-[48px] w-full rounded-[24px] border border-[#521b1b] bg-white pl-12 pr-6",
          "text-[14px] font-medium text-[#521b1b] placeholder:text-[#8a7a6a]",
          "focus:outline-none focus:ring-1 focus:ring-[#521b1b] shadow-sm transition-shadow"
        )}
      />
    </form>
  );
}
