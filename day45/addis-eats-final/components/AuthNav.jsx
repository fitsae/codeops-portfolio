"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthNav() {
  const [session, setSession] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setSession(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) return <span className="ml-auto" />;

  return (
    <span className="ml-auto flex items-center gap-4">
      {session?.role === "staff" && (
        <Link href="/kitchen" className="font-semibold hover:underline">
          Kitchen
        </Link>
      )}
      {session ? (
        <>
          <span className="text-sm text-gray-500">{session.email}</span>
          <form action="/api/signout" method="post">
            <button
              type="submit"
              className="rounded-lg border px-3 py-1 text-sm"
            >
              Sign out
            </button>
          </form>
        </>
      ) : (
        <Link href="/signin" className="font-semibold hover:underline">
          Sign in
        </Link>
      )}
    </span>
  );
}
