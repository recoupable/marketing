import type { ReactNode } from "react";
import "./blog.css";
export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="recoup-blog">{children}</div>;
}
