import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=/kitchen");

  if (session.role !== "staff") {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold">Forbidden</h1>
        <p className="mt-2 text-gray-600">
          This page is available only to staff.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Kitchen</h1>
      <p className="mt-2 text-gray-600">Staff order management.</p>
    </main>
  );
}
