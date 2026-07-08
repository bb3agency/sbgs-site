import Link from "next/link";
import {
  Gift,
  Cookie,
  Droplet,
  ShoppingBasket,
  Leaf,
  Briefcase,
  Heart,
  type LucideIcon,
} from "lucide-react";

interface CategoryTile {
  label: string;
  icon: LucideIcon;
  href: string;
  iconColor: string;
  iconBg: string;
}

const TILES: CategoryTile[] = [
  { label: "Festive Boxes", icon: Gift, href: "/products", iconColor: "text-brand-maroon", iconBg: "bg-[#f7e3e3]" },
  { label: "Daily Fresh Sweets", icon: Cookie, href: "/products", iconColor: "text-[#b07a1e]", iconBg: "bg-[#f9eccf]" },
  { label: "Ghee Specials", icon: Droplet, href: "/products", iconColor: "text-brand-gold", iconBg: "bg-[#f9f0d8]" },
  { label: "Dry Fruit Premiums", icon: ShoppingBasket, href: "/products", iconColor: "text-[#8a5a2b]", iconBg: "bg-[#f1e3d2]" },
  { label: "Sugar-Free", icon: Leaf, href: "/products", iconColor: "text-[#5b7d52]", iconBg: "bg-[#e7efe0]" },
  { label: "Corporate Gifting", icon: Briefcase, href: "/products", iconColor: "text-brand-maroon", iconBg: "bg-[#f1e2cf]" },
  { label: "Wedding Favors", icon: Heart, href: "/products", iconColor: "text-[#b03a4a]", iconBg: "bg-[#f7e0e3]" },
];

export function ShopByCategory() {
  return (
    <section className="bg-[#fbf1e3]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {TILES.map(({ label, icon: Icon, href, iconColor, iconBg }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-md sm:p-5"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform group-hover:scale-110 sm:size-14`}
              >
                <Icon className="size-6 sm:size-7" strokeWidth={1.6} />
              </span>
              <span className="text-xs font-bold text-foreground sm:text-sm">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
