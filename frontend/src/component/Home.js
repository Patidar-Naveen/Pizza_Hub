
import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <Container>
            <Navbar bg="light" variant="light">
                <Container>
                    <img src="./images/logo.jpg" height="70px" width="80px" />
                    <Nav className="d-flex justify-content-end">
                        <div>
                        <Link to='/registration' ><Button variant="outline-dark " style={{ marginRight: "10px" }}>Sign Up</Button></Link>
                        <Link to='/Login' > <Button variant="outline-dark">Login</Button></Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
            <div className="text-center mt-5">
                <img src="https://fontmeme.com/permalink/211206/057bf5a807ac9bfac6bd57fedff673e6.png" alt="netflix-font" border="0" />
                <p style={{fontSize:'20px'}}>Welcome to pizza delivery service. This is the place when you may chose the most delicious pizza you like from wide variety of options!</p>
                <br/>
                <hr/>
                <p style={{fontSize:'20px'}}>We're performing delivery free of charge in case if your order is higher than 20$</p>
               <Link to='/registration' > <Button variant="primary">Sign In and order</Button></Link>
            </div>

        </Container>

    )
}

export default Home
