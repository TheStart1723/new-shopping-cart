import React from 'react';
import Sidebar from "react-sidebar";
import CartItem from "./CartItem";
import 'rbx/index.css';
import {
    Title,
    Button,
    Container,
    Hero,
    Box
} from 'rbx';

const SideBar = ({ openSidebar, setOpenSidebar, cart, state}) => {
    const { totalCost, totalCount } = cart.reduce(
        (acc, curr) => {
            return {
                totalCost: curr.count * curr.product.price + acc.totalCost,
                totalCount: curr.count + acc.totalCount
            };
        },
        { totalCost: 0, totalCount: 0 }
    )

    return (
        <Sidebar
            sidebar={
                <Container>
                    <Hero>
                        <Hero.Body>
                            <Container>
                                <Title align="center" style={{ color: "white" }}>Cart</Title>
                                <Box color="primary" textAlign="centered">
                                    <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
                                    <br />
                                    <h2>Items : {totalCount}</h2>
                                </Box>
                                <div style={{ margin: "10px 0" }}>
                                    {cart.map(cartItem => (
                                        <CartItem key={`${cartItem.sku} | ${cartItem.size}`} item={cartItem}
                                            state={state} />
                                    ))}
                                </div>
                                <Button
                                    backgroundColor={"white"}
                                    textColor={"black"}
                                    fullwidth
                                    size={"medium"}>
                                    Checkout
                                </Button>
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
                    width: "430px",
                    background: "gray",
                    position: "fixed"
                }
            }}
            pullRight
        ></Sidebar>
    )
}

export default SideBar