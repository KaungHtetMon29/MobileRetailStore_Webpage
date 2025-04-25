import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-gray-200 min-h-screen pb-32 pt-10">
          <div className="fixed top-20 ">
            <SidebarTrigger />
          </div>
          <div className="h-full min-h-[calc(100vh-150px)]">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
