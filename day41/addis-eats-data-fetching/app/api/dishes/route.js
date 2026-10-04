import { dishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = 3;

  const filtered = query
    ? dishes.filter((d) => d.name.toLowerCase().includes(query))
    : dishes;

  const start = (page - 1) * limit;
  const results = filtered.slice(start, start + limit);

  return Response.json({
    data: results,
    page,
    limit,
    total: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  });
}
