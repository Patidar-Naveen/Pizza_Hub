import React, { useState,useEffect} from 'react'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Navbaar({cart}) {
    const [badge, setbadge] = useState(0)
    useEffect(() => {
        if(cart === undefined){
            let items =  JSON.parse(localStorage.getItem('cart'))
            let sum = 0
            items.forEach(ele => {
             sum+=ele.quantity
            })
            setbadge(sum)
        }

    },[])

    const logout = () =>{
        console.log("logOut")
        localStorage.removeItem("_token")
        localStorage.removeItem("cart")
    }
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container >
                    <Link to="/"><img src="./images/logo.jpg" height="70px" width="80px" /></Link>
                    <Nav className="container-fluid mx-5 justify-content-end">
                        <Link to="/Dash" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Menu</Link>
                        <Link to="/cart" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} className="mx-3">Cart<Badge  bg="primary">{cart === undefined?badge:cart}</Badge></Link>
                        <Link to="/profile" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Profile</Link>
                    </Nav>
                    <Link to="/" style={{ textDecoration: "none", textAlign: "right" }} className="btn btn-danger" onClick={()=>logout()}>Logout</Link>
                </Container>
            </Navbar>
        </div>
    )
}