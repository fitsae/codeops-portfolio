import { cookies } from "next/headers";

// Demo users. Real apps look this up in a database.
const USERS = {
  "demo-user-1": {
    userId: "demo-user-1",
    role: "customer",
    email: "user@example.com",
  },
  "demo-staff-1": {
    userId: "demo-staff-1",
    role: "staff",
    email: "staff@example.com",
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  if (!userId) return null;
  const user = USERS[userId];
  if (!user) return null;

  return user;
}
