import React, { Fragment } from 'react';
import {Navbar, Container, NavbarToggler, Collapse, Nav} from 'reactstrap';
import {Link} from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';

const AppNavbar = () => {
    return (
        <Fragment>
        <Navbar color='dark' dark expand='lg' className='sticky-top'>
            <Container>
                <Link to = '/' className='text-white text-decoration-none'>
                    Nick's Blog
                </Link>
                <NavbarToggler />
                <Collapse isopen='true' navbar>
                    <Nav className='ml-auto d-flex justify-content-around' navbar>
                        {false ? (
                            <LoginModal />
                        ) : (
                        <LoginModal />
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </Fragment>
    )
}

export default AppNavbar;