import React from "react";
import 'rbx/index.css';
import {
    Card,
    Content,
    Image,
    Title,
    Button,
    Icon,
    Media,
    Delete,
    Level
} from "rbx";

const CartItem = ({item, state}) => {
    return (
        <Card paddingless style={{ margin: "20px 0" }}>
            <Card.Content>
                <Media>
                    <Media.Item as="figure" align="left">
                        <Image.Container as="p" size={64}>
                            <Image
                                alt="64x64"
                                src={`data/products/${item.sku}_1.jpg`}
                            />
                        </Image.Container>
                    </Media.Item>

                    <Media.Item align="center">
                        <Title as="p" size={6}>
                            {item.product.title}
                        </Title>
                        <Title as="p" subtitle size={6}>
                            <small>Size: {item.size}</small>
                            <br/>
                            <small>Style: {item.product.style}</small>
                        </Title>
                    </Media.Item>

                    <Media.Item align="right">
                        <div style={{ float: "right" }}>
                            <Delete onClick={() => state.removeCart(item)}/>
                        </div>
                        <br />
                        <div
                            style={{
                                margin: "16%",
                                color: "green"
                            }}
                        >
                            <p>{`$${parseFloat(item.price).toFixed(2)}`}</p>
                        </div>
                        <Level breakpoint="mobile">
                            <Level.Item align="left">
                                <Level.Item as="a">
                                    <Button.Group hasAddons align="right">
                                        <Button onClick={() => state.incrementCart(item)}>
                                            <Icon size="small">+</Icon>
                                        </Button>
                                        <Button onClick={() => state.decrementCart(item)}>
                                            <Icon size="small">-</Icon>
                                        </Button>
                                    </Button.Group>
                                </Level.Item>
                            </Level.Item>
                        </Level>
                        <Content>
                            <p>
                                <small>Quantity: <medium style={{ color: "green" }}>{item.count}</medium></small>
                                <br />
                            </p>
                        </Content>
                    </Media.Item>
                </Media>
            </Card.Content>
        </Card>
    );
};

export default CartItem;