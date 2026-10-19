import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="empty-cart">
        <h1>Your Shopping Cart</h1>
        <p>Your cart is currently empty.</p>
        <Link to="/plants">
          <button className="primary-btn">Continue Shopping</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {items.map((item) => (
        <div className="cart-row" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>Unit price: ${item.price.toFixed(2)}</p>
          </div>

          <div className="quantity">
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity - 1
                  })
                )
              }
            >
              −
            </button>
            <strong>{item.quantity}</strong>
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity + 1
                  })
                )
              }
            >
              +
            </button>
          </div>

          <strong>${(item.price * item.quantity).toFixed(2)}</strong>

          <button
            className="delete-btn"
            onClick={() => dispatch(removeItem(item.id))}
          >
            Delete
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: ${total.toFixed(2)}</h2>

        <div className="cart-actions">
          <Link to="/plants">
            <button className="primary-btn continue-btn">
              Continue Shopping
            </button>
          </Link>

          <button
            className="checkout-btn"
            onClick={() => alert("Coming Soon")}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}