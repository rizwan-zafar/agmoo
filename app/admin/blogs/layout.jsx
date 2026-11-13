import { notFound } from "next/navigation";
import { BLOGS_ENABLED } from "@/lib/features";

export default function AdminBlogsLayout({ children }) {
  if (!BLOGS_ENABLED) notFound();
  return children;
}
