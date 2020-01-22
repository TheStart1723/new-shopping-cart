import React, { useState } from 'react';
import 'rbx/index.css';
import {
  Card,
  Column,
  Image,
  Content,
  Title,
  Divider,
  Button,
} from 'rbx';

const Cards = ({ product, addCart, inStock }) => {
  let sizes = ["S", "M", "L", "XL"];
  if (inStock === undefined) {
    inStock = {
      S: 0,
      M: 0,
      L: 0,
      XL: 0
    }
  }
  const [sizeSelected, setSizeSelected] = useState()

  const cartItem = {
    sku: product.sku,
    size: sizeSelected,
    price: product.price,
    count: 1,
    product
  };
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
                <Button
                  color={size === sizeSelected ? "black" : null}
                  disabled={inStock[size] === 0}
                  onClick={() => setSizeSelected(size)}
                  key={size}>
                  {size}
                </Button>
              ))}
            </Button.Group>
            <Divider />
            {`$${parseFloat(product.price).toFixed(2)}`}
            <Button.Group style={{ justifyContent: "center", marginTop: "10px" }}>
              <Button color="black" onClick={() => addCart(cartItem)} disabled={!sizes.some(size => inStock[size] > 0)}>Add to cart</Button>
            </Button.Group>
          </Content>
        </Card.Content>
      </Card>
    </Column>
  )
}

export default Cards