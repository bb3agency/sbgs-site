import { formatPrice } from "@/lib/format-price";

interface PriceDisplayProps {
  pricePaise: number;
  originalPricePaise?: number;
}

export function PriceDisplay({
  pricePaise,
  originalPricePaise,
}: PriceDisplayProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
        {formatPrice(pricePaise)}
      </span>
      {typeof originalPricePaise === "number" &&
      originalPricePaise > pricePaise ? (
        <span className="text-sm text-[#8c7b6b] line-through">
          {formatPrice(originalPricePaise)}
        </span>
      ) : null}
    </div>
  );
}
