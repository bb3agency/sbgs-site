import { MessageCircle } from "lucide-react";

/** Floating WhatsApp support button, fixed bottom-right on storefront pages. */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] flex size-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
