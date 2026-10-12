export const dishes = [
  {
    id: 1,
    slug: "chicken-tibs",
    name: "Chicken Tibs",
    description: "Tender chicken cooked with onions, tomatoes and spices.",
    price: 450,
    category: "Tibs",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tibs.JPG/1280px-Tibs.JPG",
  },
  {
    id: 2,
    slug: "beef-tibs",
    name: "Beef Tibs",
    description: "Tender beef cooked with Ethiopian spices.",
    price: 520,
    category: "Tibs",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tibs.JPG/960px-Tibs.JPG",
  },
  {
    id: 3,
    slug: "kitfo",
    name: "Kitfo",
    description: "Traditional Ethiopian minced beef dish.",
    price: 650,
    category: "Traditional",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Ethiopian_Kitfo.JPG",
  },
  {
    id: 4,
    slug: "shiro",
    name: "Shiro",
    description: "Traditional chickpea stew served with injera.",
    price: 280,
    category: "Vegetarian",
    image:
      "https://static.garrettmills.dev/assets/blog-images/food/et-shiro/shiro-1.jpg",
  },
  {
    id: 5,
    slug: "doro-wot",
    name: "Doro Wot",
    description: "Spicy Ethiopian chicken stew served with injera.",
    price: 550,
    category: "Traditional",
    image:
      "https://static.garrettmills.dev/assets/blog-images/food/et-doro/optimized/doro-1.jpg",
  },
  {
    id: 6,
    slug: "vegetable-pasta",
    name: "Vegetable Pasta",
    description: "Pasta prepared with fresh vegetables.",
    price: 320,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
  },
  {
    id: 7,
    slug: "special-burger",
    name: "Special Burger",
    description: "Beef burger with cheese and fresh vegetables.",
    price: 400,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  },
  {
    id: 8,
    slug: "vegetable-pizza",
    name: "Vegetable Pizza",
    description: "Pizza topped with fresh vegetables and cheese.",
    price: 500,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
];

export function getDishBySlug(slug) {
  return dishes.find((d) => d.slug === slug) ?? null;
}

export function getDishSlugs() {
  return dishes.map((d) => d.slug);
}
