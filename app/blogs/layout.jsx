import { notFound } from "next/navigation";
import { BLOGS_ENABLED } from "@/lib/features";

export default function BlogsLayout({ children }) {
  if (!BLOGS_ENABLED) notFound();
  return children;
}
