import React from 'react';
import 'rbx/index.css';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {
    Button,
    Navbar,
    Field,
    Control,
} from 'rbx';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const NavigationBar = ({ openSidebar, setOpenSidebar, user, uiConfig}) => {
    return (
        <Navbar color="dark" fixed="top">
            <Navbar.Menu>
                <Navbar.Segment align="end">
                    <Navbar.Item as="div">
                        {user ? (
                            <React.Fragment>
                                <div style={{ paddingRight: "15px" }}>
                                    Welcome, {user.displayName}
                                </div>
                                <Button
                                    primary="true"
                                    onClick={() => firebase.auth().signOut()}
                                >Log out</Button>
                            </React.Fragment>
                        ) : (
                                <StyledFirebaseAuth
                                    uiConfig={uiConfig}
                                    firebaseAuth={firebase.auth()}
                                />
                            )}
                    </Navbar.Item>

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