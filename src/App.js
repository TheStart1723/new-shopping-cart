import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import 'rbx/index.css';
import {
  Card,
  Column,
  Image,
  Content,
  Title,
  Divider,
  Button,
  Container,
  Navbar,
  Field,
  Control,
  Hero
} from 'rbx';

const sizes = ['S', 'M', 'L', 'XL']

const Cards = ({ product }) => {
  return (
    <Column size={3} key={product.sku}>
      <Card>
        <Card.Image>
          <Image.Container>
            <Image src={`./data/products/${product.sku}_1.jpg`} />
          </Image.Container>
        </Card.Image>
        <Card.Content align="center">
          <Content>
            <Title size={6}>
              {product.title}
            </Title>
            <Content as="p" style={{ marginTop: "-15px" }}>{`Description: ${product.description || "N/A"}`}</Content>
            <Button.Group style={{ justifyContent: "center", marginTop: "15px" }}>
              {sizes.map(size => (
                <Button key={size}>{size}</Button>
              ))}
            </Button.Group>
            <Divider />
            {`$${parseFloat(product.price).toFixed(2)}`}
            <Button.Group style={{ justifyContent: "center", marginTop: "10px" }}>
              <Button color="black">Add to cart</Button>
            </Button.Group>
          </Content>
        </Card.Content>
      </Card>
    </Column>
  )
}

const NavigationBar = ({ setOpenSidebar }) => {
  return (
    <Navbar color="dark" fixed="top">
      <Navbar.Menu>
        <Navbar.Segment align="end">
          <Navbar.Item as="div">
            <Field kind="group">
              <Control>
                <Button color="light" onClick={() => setOpenSidebar(true)}>
                  <span>Shopping Cart</span>
                </Button>
              </Control>
            </Field>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  )
}

const SideBar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <Sidebar
      sidebar={
        <Container>
          <Hero>
            <Hero.Body>
              <Container>
                <Title align="center" style={{color: "white"}}>Cart</Title>
              </Container>
            </Hero.Body>
          </Hero>
        </Container>
      }
      open={openSidebar}
      onSetOpen={setOpenSidebar}
      styles={{
        sidebar: {
          transition: "left .1s, right .1s",
          WebkitTransition: "-webkit-transform .1s ease-out",
          paddingTop: "53px",
          width: "300px",
          background: "gray",
          position: "fixed"
        }
      }}
      pullRight
    ></Sidebar>
  )
}

const App = () => {
  const [data, setData] = useState({});
  const [openSidebar, setOpenSidebar] = useState(false);
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <NavigationBar setOpenSidebar={setOpenSidebar} />
      <Container fluid style={{ margin: 0, marginTop: "-20px" }}>
        <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Container style={{ marginTop: "20px" }}>
          {[...Array(Math.ceil(products.length / 4)).keys()]
            .map(i => (products.slice(4 * i, 4 * i + 4)))
            .map((products, idx) => (
              <Column.Group key={idx}>
                {products.map(product => (
                  <Cards product={product} />
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