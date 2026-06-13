import Image from "next/image";

export function StoreSeparator() {
  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] overflow-hidden">
      <Image 
        src="/images/sweets/IMG_20260612_182754.jpg"
        alt="Sri Sai Baba Ghee Sweets Store Interior"
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
