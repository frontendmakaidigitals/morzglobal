import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";
import Head from "./head";
import { TooltipProvider } from "@/components/ui/tooltip";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Head />
        <main className="container mt-7">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </div>
    </SidebarProvider>
  );
}
