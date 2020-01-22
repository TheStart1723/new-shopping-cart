import React from 'react';
import 'rbx/index.css';
import {
    Button,
    Navbar,
    Field,
    Control,
} from 'rbx';


const NavigationBar = ({ openSidebar, setOpenSidebar }) => {
    return (
        <Navbar color="dark" fixed="top">
            <Navbar.Menu>
                <Navbar.Segment align="end">
                    <Navbar.Item as="div">
                        <Field kind="group">
                            <Control>
                                <Button
                                    color="light"
                                    onClick={() => setOpenSidebar(!openSidebar)}
                                >
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

export default NavigationBar