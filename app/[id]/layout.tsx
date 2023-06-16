import HomeNavbar from "../homepage/components/HomeNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HomeNavbar />
      {children}
    </section>
  );
}
