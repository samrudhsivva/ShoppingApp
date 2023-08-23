import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductsList";
import PaymentPage from "./components/Payment";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [products] = useState([
    { id: 1, name: "Product 1", description: "Description 1", price: 10 },
    { id: 2, name: "Product 2", description: "Description 2", price: 15 },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setCartPrice(total);
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={[
            <ProductList products={products} addToCart={addToCart} />,
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              cartPrice={cartPrice}
            />,
          ]}
        />
        <Route path="/payment" element={<PaymentPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
