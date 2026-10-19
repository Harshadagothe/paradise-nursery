import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plants = [
  { id: 1, name: "Snake Plant", price: 25, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b8c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Peace Lily", price: 30, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Monstera", price: 35, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "ZZ Plant", price: 28, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1632207691144-9e6c9c1d6d0b?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Rubber Plant", price: 32, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1601985705806-5b3a3a7f2c6a?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Pothos", price: 22, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1616767961900-7f5b9a3f1a76?auto=format&fit=crop&w=600&q=80" },

  { id: 7, name: "Areca Palm", price: 40, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1523430113731-1aee4f7e9f9f?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Bird of Paradise", price: 55, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1597055181300-7a7f9e0c5f4f?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Croton", price: 27, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80" },
  { id: 10, name: "Fiddle Leaf Fig", price: 48, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Boston Fern", price: 24, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1614594573497-1d9b1f2a7f47?auto=format&fit=crop&w=600&q=80" },
  { id: 12, name: "Calathea", price: 34, category: "Outdoor Plants", image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80" },

  { id: 13, name: "Aloe Vera", price: 18, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80" },
  { id: 14, name: "Echeveria", price: 16, category: "Succulents", image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80" },
  { id: 15, name: "Jade Plant", price: 20, category: "Succulents", image: "https://images.unsplash.com/photo-1561218806-4c2a9b0f1b42?auto=format&fit=crop&w=600&q=80" },
  { id: 16, name: "Haworthia", price: 15, category: "Succulents", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80" },
  { id: 17, name: "Zebra Cactus", price: 19, category: "Succulents", image: "https://images.unsplash.com/photo-1558856765-0d5d6d7e1e4b?auto=format&fit=crop&w=600&q=80" },
  { id: 18, name: "String of Pearls", price: 26, category: "Succulents", image: "https://images.unsplash.com/photo-1614594895304-fe7116ac3b5d?auto=format&fit=crop&w=600&q=80" }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [added, setAdded] = useState([]);

  const categories = useMemo(
    () => [...new Set(plants.map((plant) => plant.category))],
    []
  );

  const isAdded = (id) =>
    added.includes(id) || cartItems.some((item) => item.id === id);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAdded((current) => [...current, plant.id]);
  };

  return (
    <main className="page">
      <header className="page-title">
        <h1>Our Plants</h1>
        <p>Choose from our collection of beautiful houseplants.</p>
      </header>

      {categories.map((category) => (
        <section className="category" key={category}>
          <h2>{category}</h2>
          <div className="product-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <article className="product-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="product-info">
                    <h3>{plant.name}</h3>
                    <p className="price">${plant.price.toFixed(2)}</p>
                    <button
                      className="cart-btn"
                      disabled={isAdded(plant.id)}
                      onClick={() => handleAdd(plant)}
                    >
                      {isAdded(plant.id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}