export const dishes = [
  {
    id: 1,
    slug: "chicken-tibs",
    name: "Chicken Tibs",
    description: "Tender chicken cooked with onions, tomatoes and spices.",
    price: 450,
    category: "Tibs",
  },
  {
    id: 2,
    slug: "beef-tibs",
    name: "Beef Tibs",
    description: "Tender beef cooked with Ethiopian spices.",
    price: 520,
    category: "Tibs",
  },
  {
    id: 3,
    slug: "kitfo",
    name: "Kitfo",
    description: "Traditional Ethiopian minced beef dish.",
    price: 650,
    category: "Traditional",
  },
  {
    id: 4,
    slug: "shiro",
    name: "Shiro",
    description: "Traditional chickpea stew served with injera.",
    price: 280,
    category: "Vegetarian",
  },
  {
    id: 5,
    slug: "doro-wot",
    name: "Doro Wot",
    description: "Spicy Ethiopian chicken stew served with injera.",
    price: 550,
    category: "Traditional",
  },
  {
    id: 6,
    slug: "vegetable-pasta",
    name: "Vegetable Pasta",
    description: "Pasta prepared with fresh vegetables.",
    price: 320,
    category: "Pasta",
  },
  {
    id: 7,
    slug: "special-burger",
    name: "Special Burger",
    description: "Beef burger with cheese and fresh vegetables.",
    price: 400,
    category: "Burger",
  },
  {
    id: 8,
    slug: "vegetable-pizza",
    name: "Vegetable Pizza",
    description: "Pizza topped with fresh vegetables and cheese.",
    price: 500,
    category: "Pizza",
  },
];

export function getDishBySlug(slug) {
  return dishes.find((d) => d.slug === slug) ?? null;
}

export function getDishSlugs() {
  return dishes.map((d) => d.slug);
}
