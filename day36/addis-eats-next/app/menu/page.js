import { getDishes } from "@/lib/dishes";
import MenuClient from "./MenuClient";

export const metadata = { title: "Menu · Addis Eats" };

export default async function MenuPage({ searchParams }) {
  const sp = await searchParams;

  if (sp?.break === "1") {
    throw new Error("Demo: the menu segment exploded on purpose.");
  }

  const dishes = await getDishes();

  return <MenuClient dishes={dishes} />;
}
