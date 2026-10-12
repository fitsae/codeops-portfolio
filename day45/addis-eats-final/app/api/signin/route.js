import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "password123";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const next = formData.get("next") || "/";

  const accounts = {
    "user@example.com": { password: DEMO_PASSWORD, id: "demo-user-1" },
    "staff@example.com": { password: DEMO_PASSWORD, id: "demo-staff-1" },
  };

  const account = accounts[email];
  if (!account || account.password !== password) {
    return new Response("Invalid credentials", { status: 401 });
  }

  if (
    typeof next !== "string" ||
    !next.startsWith("/") ||
    next.startsWith("//")
  ) {
    return NextResponse.redirect(new URL("/", request.url), 303);
  }

  const cookieStore = await cookies();
  cookieStore.set("session", account.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.redirect(new URL(next, request.url), 303);
}
