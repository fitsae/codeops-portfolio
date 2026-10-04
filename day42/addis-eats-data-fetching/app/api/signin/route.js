import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const next = formData.get("next") || "/";

  // Demo credentials only. Real apps: hash passwords (bcrypt/argon2) and verify.
  const DEMO = {
    "user@example.com": { password: "password123", id: "demo-user-1" },
    "staff@example.com": { password: "password123", id: "demo-staff-1" },
  };

  const account = DEMO[email];
  if (!account || account.password !== password) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Open-redirect guard: only allow internal paths.
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
