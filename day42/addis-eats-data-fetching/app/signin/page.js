export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/";

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">Sign in</h1>

      <form action="/api/signin" method="post" className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <input type="hidden" name="next" value={next} />

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 px-4 py-3 text-white"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500">
        Demo — customer: <code>user@example.com / password123</code>
        <br />
        Demo — staff: <code>staff@example.com / password123</code>
      </p>
    </main>
  );
}
