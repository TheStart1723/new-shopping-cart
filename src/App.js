import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Card, Column, Image, Content, Title, Divider, Button } from 'rbx';

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
            <Content as="p" style={{marginTop: "-15px"}}>{`Description: ${product.description || "N/A"}`}</Content>
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

const App = () => {
  const [data, setData] = useState({});
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
    <div>
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
    </div>
  );
};

export default App;