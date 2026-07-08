import Link from "next/link";
import { Truck, RotateCcw, Ban } from "lucide-react";

export function PoliciesSection() {
  const policies = [
    {
      icon: Truck,
      title: "Shipping & Deliveries",
      description:
        "Packages are dispatched within 1 working day after we receive your order. Delivery within 3-5 business days.",
      link: "/shipping",
      linkText: "Read more",
    },
    {
      icon: Ban,
      title: "Cancellations",
      description:
        "Hygienic, Delivery Chilling for all orders before dispatch. Free cancellation before pack and ship.",
      link: "/returns",
      linkText: "Read more",
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      description:
        "In case of damages during transit, our quality assurance team will resolve your complaints swiftly.",
      link: "/returns",
      linkText: "Read more",
    },
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground sm:text-3xl">
        Our Policies
      </h2>
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
        {policies.map(({ icon: Icon, title, description, link, linkText }) => (
          <div key={title} className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#f5ebe0]">
              <Icon className="size-5 text-[#6B1D2A]" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-foreground sm:text-base underline underline-offset-2 decoration-[#6B1D2A]">
              {title}
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {description}
            </p>
            <Link
              href={link}
              className="text-xs font-bold text-[#6B1D2A] underline underline-offset-2 hover:text-[#8B2F3E]"
            >
              {linkText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
