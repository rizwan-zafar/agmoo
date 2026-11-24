"use client";

import { useState } from "react";
import SmartImage from "@/components/common/SmartImage";

export default function ProductImageCarousel({ images, alt }) {
  const slides = Array.isArray(images) ? images.filter(Boolean) : [];
  const [index, setIndex] = useState(0);

  if (!slides.length) {
    return (
      <div className="product-carousel aspect-square rounded-2xl overflow-hidden bg-brand-50">
        <SmartImage src={null} alt={alt} className="h-full w-full object-cover" fallback="⚡" />
      </div>
    );
  }

  const safeIndex = Math.min(index, slides.length - 1);
  const hasMany = slides.length > 1;

  const go = (delta) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  };

  return (
    <div className="product-carousel-wrap">
      <div className="product-carousel aspect-square rounded-2xl overflow-hidden bg-brand-50 relative group">
        <SmartImage
          src={slides[safeIndex]}
          alt={alt}
          className="h-full w-full object-cover"
          fallback="⚡"
        />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1 text-xl leading-none text-stone-800 shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1 text-xl leading-none text-stone-800 shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === safeIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {slides.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                i === safeIndex ? "border-brand-500" : "border-stone-200 opacity-80 hover:opacity-100"
              }`}
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}