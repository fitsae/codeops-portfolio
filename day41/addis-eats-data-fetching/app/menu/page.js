import SearchBox from "./SearchBox";
import PaginatedMenu from "./PaginatedMenu";
import TanStackMenu from "./TanStackMenu";

export const metadata = { title: "Menu · Addis Eats" };

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-4xl font-bold">Addis Eats Menu</h1>
      <p className="mb-8 text-gray-600">
        Search for your favorite Ethiopian dishes.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Search</h2>
        <SearchBox />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Browse all dishes</h2>
        <PaginatedMenu />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Same data, TanStack Query
        </h2>
        <TanStackMenu />
      </section>
    </main>
  );
}
