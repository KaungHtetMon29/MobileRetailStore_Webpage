export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full justify-items-center h-full bg-black">
        <div className="container flex w-full h-screen flex-col gap-16 items-center pt-40">
          {children}
        </div>
      </main>
    </>
  );
}
