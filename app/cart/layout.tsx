import Footer from "@/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-full justify-items-center pb-10 pt-32 h-full bg-gray-100">
        <div className="container flex w-full flex-col gap-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}
