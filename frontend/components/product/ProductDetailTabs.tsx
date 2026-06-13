"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailTabsProps {
  description: string;
  tags: string[];
  categoryName: string;
  categorySlug: string;
}

type TabId = "about" | "ingredients" | "shelf_life" | "additional";

export function ProductDetailTabs({
  description,
  tags,
  categoryName,
  categorySlug,
}: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  // Break description into paragraphs
  const paragraphs = description.split(/\n{2,}/).filter(Boolean);

  const tabs: { id: TabId; label: string }[] = [
    { id: "about", label: "About" },
    { id: "ingredients", label: "Ingredients" },
    { id: "shelf_life", label: "Shelf Life" },
  ];

  return (
    <div className="rounded-xl border border-[#ece3d8] bg-white">
      {/* Tab bar */}
      <div className="flex gap-0 overflow-x-auto border-b border-[#ece3d8] scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors sm:px-8",
              activeTab === tab.id
                ? "text-[#6B1D2A]"
                : "text-[#8c7b6b] hover:text-[#3a2218]",
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-[#6B1D2A]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-5 py-7 sm:px-8 sm:py-9">
        {activeTab === "about" && (
          <div className="max-w-3xl">
            {paragraphs.length > 1 ? (
              <div className="space-y-4">
                {paragraphs.map((para, i) => {
                  // Detect bullet list lines (starts with - or *)
                  const lines = para.split("\n");
                  const isList = lines.every((l) => /^[-*•]\s/.test(l.trim()));

                  if (isList) {
                    return (
                      <ul key={i} className="space-y-1.5 pl-1">
                        {lines.map((line, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm leading-relaxed text-[#6b5c50]"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#6B1D2A]" aria-hidden />
                            {line.replace(/^[-*•]\s*/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Check for a heading-like line (ends with :, ALL CAPS, or is short)
                  const firstLine = lines[0];
                  const rest = lines.slice(1).join("\n");
                  const isHeading =
                    firstLine.endsWith(":") ||
                    (firstLine === firstLine.toUpperCase() && firstLine.length < 60);

                  if (isHeading && rest) {
                    return (
                      <div key={i}>
                        <h3 className="mb-2 text-sm font-bold text-[#3a2218]">
                          {firstLine.replace(/:$/, "")}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#6b5c50]">{rest}</p>
                      </div>
                    );
                  }

                  return (
                    <p key={i} className="text-sm leading-relaxed text-[#6b5c50]">
                      {para}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-[#6b5c50]">
                {description || "No description available."}
              </p>
            )}

            {/* Category & tags */}
            <div className="mt-6 space-y-3 border-t border-[#ece3d8] pt-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8c7b6b]">Category</span>
                <Link
                  href={`/categories/${categorySlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B1D2A] hover:underline"
                >
                  <Package className="size-3.5" aria-hidden />
                  {categoryName}
                </Link>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8c7b6b]">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-[#f5ebe0] px-2.5 py-0.5 text-xs font-semibold text-[#6B1D2A]"
                      >
                        <Tag className="size-2.5" aria-hidden />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div className="max-w-3xl space-y-4">
            <p className="text-sm leading-relaxed text-[#6b5c50]">
              Made with premium quality ingredients sourced from trusted suppliers:
            </p>
            <ul className="space-y-2 pl-1">
              {["100% Pure Desi Ghee", "Fresh Milk & Khoya", "Premium Sugar", "Cardamom & Natural Flavors", "Dry Fruits (as applicable)"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#6b5c50]">
                  <span className="size-1.5 shrink-0 rounded-full bg-[#6B1D2A]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-[#f5ebe0] px-4 py-3 text-xs text-[#8c7b6b]">
              <strong className="text-[#3a2218]">Note:</strong> Contains milk and milk products. May contain traces of nuts.
            </p>
          </div>
        )}

        {activeTab === "shelf_life" && (
          <div className="max-w-3xl space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#ece3d8] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8c7b6b]">Shelf Life</p>
                <p className="mt-1 text-lg font-bold text-[#3a2218]">15–20 Days</p>
                <p className="mt-1 text-xs text-[#8c7b6b]">When stored properly</p>
              </div>
              <div className="rounded-lg border border-[#ece3d8] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8c7b6b]">Storage</p>
                <p className="mt-1 text-lg font-bold text-[#3a2218]">Refrigerate</p>
                <p className="mt-1 text-xs text-[#8c7b6b]">Keep in cool, dry place</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#6b5c50]">
              For best taste, consume within the recommended shelf life. Store in an airtight container away from direct sunlight. Refrigerate after opening to maintain freshness.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
