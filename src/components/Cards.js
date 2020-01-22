import React, {useState} from 'react';
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


const sizes = ['S', 'M', 'L', 'XL']

const Cards = ({product, addCart}) => {
  const [sizeSelected, setSizeSelected] = useState(sizes[0])
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
                  onClick={() => setSizeSelected(size)}
                  key={size}>
                  {size}
                </Button>
              ))}
            </Button.Group>
            <Divider />
            {`$${parseFloat(product.price).toFixed(2)}`}
            <Button.Group style={{ justifyContent: "center", marginTop: "10px" }}>
              <Button color="black" onClick={() => addCart(cartItem)}>Add to cart</Button>
            </Button.Group>
          </Content>
        </Card.Content>
      </Card>
    </Column>
  )
}

export default Cards