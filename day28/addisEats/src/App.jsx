import Header from "./components/Header";
import Menu from "./components/Menu";
import DeliveryForm from "./components/DeliveryForm";
import "./App.css";

function App() {
  const dishes = [
    {
      id: 1,
      name: "Chechebsa",
      price: 150,
      category: "Breakfast",
      spicy: false,
    },
    {
      id: 2,
      name: "Firfir",
      price: 120,
      category: "Breakfast",
      spicy: true,
    },
    {
      id: 3,
      name: "Special Tibs",
      price: 350,
      category: "Lunch",
      spicy: true,
    },
    {
      id: 4,
      name: "Shiro Wot",
      price: 180,
      category: "Lunch",
      spicy: true,
    },
    {
      id: 5,
      name: "Doro Wot",
      price: 400,
      category: "Dinner",
      spicy: true,
    },
    {
      id: 6,
      name: "Kitfo",
      price: 450,
      category: "Dinner",
      spicy: true,
    },
    {
      id: 7,
      name: "Macchiato",
      price: 80,
      category: "Drinks",
      spicy: false,
    },
    {
      id: 8,
      name: "Fresh Juice",
      price: 100,
      category: "Drinks",
      spicy: false,
    },
  ];

  return (
    <>
      <Header />

      <main className="container">
        <Menu dishes={dishes} />

        <DeliveryForm />
      </main>
    </>
  );
}

export default App;
