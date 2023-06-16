import { SearchProvider } from "./SearchContext/SearchContext";
import HomeNavbar from "./components/HomeNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SearchProvider>
        <HomeNavbar />
        {children}
      </SearchProvider>
    </section>
  );
}
