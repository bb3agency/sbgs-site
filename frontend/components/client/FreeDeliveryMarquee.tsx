"use client";

export function FreeDeliveryMarquee() {
  const text = "FREE DELIVERY ACROSS INDIA";

  return (
    <div className="overflow-hidden border-y border-[#ece3d8] bg-[#FDF8F3] py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mx-6 flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-foreground sm:text-xl">
            {text}
            <span className="text-[#6B1D2A]">●</span>
            <span className="text-brand-gold">●</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
