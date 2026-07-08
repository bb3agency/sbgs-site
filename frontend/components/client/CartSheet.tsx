"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { useUiStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/format-price";
import { getCartLineImageUrl, getCartLineImageAlt, getCartLineProductName } from "@/lib/cart-line-display";

export function CartSheet() {
  const { cartSheetOpen, setCartSheetOpen } = useUiStore();
  const { items, cart } = useCartStore();

  const close = () => setCartSheetOpen(false);

  // Trap body scroll while open
  useEffect(() => {
    if (cartSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartSheetOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!cartSheetOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [cartSheetOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          cartSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer — slides in from the RIGHT */}
      <div
        className={`fixed inset-y-0 right-0 z-[101] flex w-full max-w-[400px] flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out ${
          cartSheetOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-end p-4">
          <button
            onClick={close}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="size-6 font-light" strokeWidth={1} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          {items.length === 0 ? (
            <div className="flex w-full flex-col items-center max-w-[320px] mx-auto">
              <h2 className="mb-8 font-serif text-3xl font-normal text-[#1a1a1a]">
                Your cart is empty
              </h2>
              
              <button
                onClick={close}
                className="mb-16 w-full bg-[#111111] py-3.5 text-[13px] font-medium tracking-wider text-white transition-colors hover:bg-black font-['Montserrat']"
              >
                Continue shopping
              </button>

              <div className="flex flex-col items-center gap-2">
                <p className="font-serif text-[22px] font-normal text-[#1a1a1a]">
                  Have an account?
                </p>
                <p className="font-['Montserrat'] text-[15px] text-[#555555]">
                  <Link href="/login" onClick={close} className="text-black underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
                    Log in
                  </Link>{" "}
                  to check out faster.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col h-full text-left">
               <div className="p-6 pb-4 border-b border-brand-maroon/10 flex items-center justify-between">
                 <h2 className="font-serif text-2xl font-normal text-brand-maroon italic flex items-center gap-2">
                   <ShoppingBag className="size-5" />
                   Your Cart ({items.length})
                 </h2>
               </div>
               <div className="flex-1 overflow-y-auto w-full p-6 space-y-6">
                 {items.map((item) => {
                   const productName = getCartLineProductName(item);
                   return (
                     <div key={item.id} className="flex gap-4">
                       <Link
                         href="#"
                         onClick={close}
                         className="relative size-20 shrink-0 overflow-hidden border border-brand-maroon/10 bg-brand-cream"
                       >
                         <Image
                           src={getCartLineImageUrl(item)}
                           alt={getCartLineImageAlt(item)}
                           fill
                           className="object-cover"
                           sizes="80px"
                         />
                       </Link>
                       <div className="flex flex-1 flex-col justify-between">
                         <div>
                           <h3 className="font-serif text-base text-[#1a1a1a]">
                             {productName}
                           </h3>
                           <p className="text-xs text-brand-maroon/70 font-['Montserrat'] mt-1">
                             Variant: {item.variant.name}
                           </p>
                           <p className="text-xs text-brand-maroon/70 font-['Montserrat']">
                             Qty: {item.quantity}
                           </p>
                         </div>
                         <p className="font-bold text-brand-gold font-['Montserrat'] text-sm mt-2">
                           {formatPrice(item.lineTotal)}
                         </p>
                       </div>
                     </div>
                   );
                 })}
               </div>
               <div className="border-t border-brand-maroon/10 bg-brand-cream/30 p-6 w-full space-y-4">
                  <div className="flex justify-between items-center text-lg font-serif">
                    <span className="text-[#1a1a1a]">Subtotal</span>
                    <span className="font-bold text-brand-gold font-['Montserrat']">{formatPrice(cart?.subtotal ?? 0)}</span>
                  </div>
                  <Link 
                    href="/cart" 
                    onClick={close}
                    className="flex w-full bg-brand-maroon py-3.5 text-[13px] font-medium tracking-widest text-brand-cream uppercase transition-all hover:bg-brand-gold hover:shadow-lg font-['Montserrat'] justify-center items-center gap-2"
                  >
                    View Cart & Checkout <Sparkles className="size-4" />
                  </Link>
               </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
