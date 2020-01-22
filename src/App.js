import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import Cards from "./components/Cards";
import SideBar from "./components/SideBar";
import NavigationBar from "./components/NavigationBar";
import { Column, Container } from 'rbx';

const App = () => {
  const [data, setData] = useState({});
  const [openSidebar, setOpenSidebar] = useState(false);
  const products = Object.values(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const addCart = item => {
    const itemExists = cart.some(
      x => x.sku === item.sku && x.size === item.size
    );
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
  };

  return (
    <React.Fragment>
      <NavigationBar setOpenSidebar={setOpenSidebar} />
      <Container fluid style={{ margin: 0, marginTop: "-20px" }}>
        <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} cart={cart} />
        <Container style={{ marginTop: "20px" }}>
          {[...Array(Math.ceil(products.length / 4)).keys()]
            .map(i => (products.slice(4 * i, 4 * i + 4)))
            .map((products, idx) => (
              <Column.Group key={idx}>
                {products.map(product => (
                  <Cards product={product} addCart={addCart} cart={cart} setCart={setCart} setOpenSidebar={setOpenSidebar} />
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