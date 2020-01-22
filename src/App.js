import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import "./App.css";
import Cards from "./components/Cards";
import SideBar from "./components/SideBar";
import NavigationBar from "./components/NavigationBar";
import { Column, Container } from 'rbx';
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5kvJJhTbgCJsj9Oy0RwGUFiSf0dyME8I",
  authDomain: "new-shopping-cart-f3698.firebaseapp.com",
  databaseURL: "https://new-shopping-cart-f3698.firebaseio.com",
  projectId: "new-shopping-cart-f3698",
  storageBucket: "new-shopping-cart-f3698.appspot.com",
  messagingSenderId: "988261010713",
  appId: "1:988261010713:web:587924bd623856fdf8c988",
  measurementId: "G-6S5DZRL31K"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({});
  const [openSidebar, setOpenSidebar] = useState(false);
  const products = Object.values(data);
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setInventory(snap.val());
      }
    }
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    }
  }, []);

  const addCart = item => {
    if (item.size === undefined) {
      return;
    }
    const itemExists = cart.some(
      x => x.sku === item.sku && x.size === item.size
    )
    if (itemExists) {
      let newCart = [...cart];
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].sku === item.sku && newCart[i].size === item.size) {
          newCart[i].count += 1;
        }
      }
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
    setOpenSidebar(true);
  }

  const incrementCart = item => {
    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].sku === item.sku && newCart[i].size === item.size) {
        newCart[i].count += 1;
      }
    }
    setCart(newCart);
  }

  const decrementCart = item => {
    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].sku === item.sku && newCart[i].size === item.size) {
        if (newCart[i].count > 1) {
          newCart[i].count -= 1;
        } else {
          newCart.splice(i, 1);
        }
      }
    }
    setCart(newCart);
  }

  const removeCart = item => {
    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].sku === item.sku && newCart[i].size === item.size) {
        newCart.splice(i, 1);
      }
    }
    setCart(newCart);
  }

  return (
    <React.Fragment>
      <NavigationBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Container fluid style={{ margin: 0, marginTop: "-20px" }}>
        <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} cart={cart} setCart={setCart}
          state={{
            incrementCart,
            decrementCart,
            removeCart
          }} />
        <Container style={{ marginTop: "20px" }}>
          {[...Array(Math.ceil(products.length / 4)).keys()]
            .map(i => (products.slice(4 * i, 4 * i + 4)))
            .map((products, idx) => (
              <Column.Group key={idx}>
                {products.map(product => (
                  <Cards product={product} inStock={inventory[product.sku]} addCart={addCart} cart={cart} setOpenSidebar={setOpenSidebar} />
                ))}
              </Column.Group>
            ))
          }
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default App;