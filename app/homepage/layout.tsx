import HomeNavbar from "./components/HomeNavbar";

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
