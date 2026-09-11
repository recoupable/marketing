import { PrivyAuthProvider } from "@/contexts/PrivyAuthProvider";
export default function ValuationLayout({ children }: { children: React.ReactNode }) { return <PrivyAuthProvider>{children}</PrivyAuthProvider>; }
