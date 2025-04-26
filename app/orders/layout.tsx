import Container from "@/layouts/container";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <Container>{children}</Container>
    </main>
  );
}
