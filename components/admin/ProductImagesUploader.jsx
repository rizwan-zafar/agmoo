"use client";

import { useRef, useState } from "react";
import { PRODUCT_MAX_IMAGES } from "@/lib/product";
import { useToast } from "@/components/common/ToastContext";

export default function ProductImagesUploader({ value = [], onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const images = Array.isArray(value) ? value : [];
  const canAdd = images.length < PRODUCT_MAX_IMAGES;

  const uploadFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Upload failed", "error");
        return;
      }
      onChange([...images, data.url].slice(0, PRODUCT_MAX_IMAGES));
    } catch {
      showToast("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-stone-700">Product images</p>
        <p className="text-xs text-slate-500 mt-0.5">
          Up to {PRODUCT_MAX_IMAGES} images. First image is used on shop cards and listing thumbnails.
        </p>
        <div
          className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 leading-relaxed"
          role="note"
        >
          <p className="font-medium text-slate-700">Recommended size</p>
          <ul className="mt-1 list-disc pl-4 space-y-0.5">
            <li>
              <strong>1600 × 1600 px</strong>, square (1:1) — sharp on phones, tablets, and desktop
            </li>
            <li>JPEG or WebP, good lighting, product centered (edges may crop)</li>
            <li>Max 5 MB per file</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {images.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative h-24 w-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            {index === 0 && (
              <span className="absolute top-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                Main
              </span>
            )}
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute top-1 right-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-red-600 shadow hover:bg-white"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}

        {canAdd && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="h-24 w-24 rounded-xl border border-dashed border-stone-300 bg-stone-50 text-stone-500 text-sm font-medium hover:border-brand-400 hover:text-brand-600 disabled:opacity-60 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl">+</span>
              {uploading ? "…" : "Add"}
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-stone-500">
        {images.length} / {PRODUCT_MAX_IMAGES} images
      </p>
    </div>
  );
}