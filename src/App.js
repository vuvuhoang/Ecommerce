import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import { books } from "./data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { counter } from "@fortawesome/fontawesome-svg-core";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  const [cart, setCart] = useState([]);

  function addItemToCart(book) {
    const dupeItem = cart.find((item) => item.id === book.id);
    setCart((oldCart) =>
      dupeItem
        ? [
            ...oldCart.map((item) => {
              return item.id === dupeItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item;
            }),
          ]
        : [...oldCart, { ...book, quantity: 1 }]
    );
  }


  function updateCart(item, newQuantity) {
    setCart(cart.map((oldItem) => 
        oldItem.id === item.id ? 
          {
            ...oldItem,
            quantity: newQuantity,
          }
         : oldItem
        
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  function calcPrices() {
    let total = 0;
    cart.forEach((item) => {
      total += (item.salePrice || item.originalPrice) * item.quantity;
    });
    return {
      subtotal: total * 0.9,
      tax: total * 0.1,
      total,
    };
  }

  return (
    <Router>
      <ScrollToTop>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/books" element={ <Books books={books} />} />
        <Route
          path="/books/:id"
          element={ (
            <BookInfo cart={cart} books={books} addItemToCart={addItemToCart} />
          )}
        />
        <Route
          path="/cart"
          element={(
            <Cart
              cart={cart}
              updateCart={updateCart}
              removeItem={removeItem}
              totals={calcPrices()}
            />
          )}
        />
        </Routes>
        <Footer />
      </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
