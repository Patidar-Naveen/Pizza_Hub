import { Card, CardContent, Button, TextField, FormControl, Box } from '@mui/material'
import React, { useState } from 'react'
import '../App.css'
import axios from "axios";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { Col, Row } from 'react-bootstrap';
import mystyles from './css'; 
import { addUser } from '../Config/Myservices';
const regForAddress = RegExp(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/);
const passFormat = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForContact = RegExp(/^[6-9][0-9]{9}/);


export default function Registration() {
    const [state, setState] = useState({ username: '', email: '', contact: '', address: '', password: '', cpassword: '' });
    const [errors, seterror] = useState({ errname: '', erremail: '', errcontact: '', erraddress: '', errpassword: '', errcpassword: '' });
    const navigate = useNavigate();

    const handler = (event) => {
        let error = ''
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
        switch (name) {

            case "username":
                error = regForName.test(value) ? "" : "Invalid Username";
                seterror({ ...errors, errname: error });
                break;

            case "email":
                error = regForEmail.test(value) ? "" : "Enter Correct Email-Id";
                seterror({ ...errors, erremail: error });
                break;
            case "contact":
                error = regForContact.test(value) ? "" : "Enter Correct Contact number";
                seterror({ ...errors, errcontact: error });
                break;
            case "address":
                error = regForAddress.test(value) ? "" : "Enter Correct Email-Id";
                seterror({ ...errors, erraddress: error });
                break;

            case "password":
                error =passFormat.test(value)
                    ? "Password Should Contain atleast 8 character with Upper, lower and special character"
                    : "";
                seterror({ ...errors, errpassword: error, password: value });
                break;

            case "cpassword":
                error = value === state.password ? "" : "Password does not match";
                seterror({ ...errors, errcpassword: error });
                break;
        }
    };

    const validate = () => {
        // state.password != '' && && errors.errpassword
        console.log(state)
        console.log(errors)
        if (state.username != '' && state.email != ''&& state.contact != ''&& state.address != '' && state.password != '' && state.cpassword != '') {
            if (errors.errname == '' && errors.errcontact == '' && errors.erraddress == '' && errors.erremail == '' && errors.errcpassword == '') {
                let formData = {
                    name: state.username,
                    email: state.email,
                    password: state.cpassword,
                    contact:state.contact,
                    address:state.address
                };
                addUser(formData)
                navigate("/Login")

            }
            else {
                alert("Enter all details right");
            }
        }
        else {
            alert("Enter all details");
        }
    };

    return (
        <Box className="backimg" sx={{ width: "100%", height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Card className="blur" sx={{ width: "70ch", mx: "auto" ,color:'white' }}>
                <CardContent>
                    <h1 style={{ textAlign: "center" }}>
                        Registration Page
                    </h1>

                    <Row>
                        <Col>
                            <FormControl sx={{ my: 1, ml: 1, width: "30ch" }}>
                                <TextField sx={mystyles}
                                    onBlur={handler}
                                    name="username"
                                    label="Username"
                                    helperText={errors.errname}
                                    
                                />
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl sx={{ my: 1, mx: 1, width: "30ch" }}>
                                <TextField
                                sx={mystyles}
                                    onBlur={handler}
                                    name="email"
                                    label="Email"
                                    helperText={errors.erremail}
                                    
                                />
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControl sx={{ my: 1, ml: 1, width: "30ch" }}>
                                <TextField
                                sx={mystyles}
                                    onBlur={handler}
                                    name="contact"
                                    label="Contact"
                                    helperText={errors.errcontact}
                                    
                                />
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl sx={{ my: 1, mx: 1, width: "30ch" }}>
                                <TextField
                                sx={mystyles}
                                    onBlur={handler}
                                    name="address"
                                    label="Address"
                                    helperText={errors.erraddress}
                                    
                                />
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControl sx={{ my: 1, ml: 1, width: "30ch" }}>
                                <TextField
                                sx={mystyles}
                                    onBlur={handler}
                                    name="password"
                                    type="password"
                                    label="Password"
                                    helperText={errors.errpassword}
                                    
                                />
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl sx={{ my: 1, mx: 1, width: "30ch" }}>
                                <TextField
                                sx={mystyles}
                                    onBlur={handler}
                                    name="cpassword"
                                    type="password"
                                    label="Confirm password"
                                    helperText={errors.errcpassword}
                                    
                                />
                            </FormControl>
                        </Col>
                    </Row>
                    <div className="text-center mt-1">
                        <Button
                            onClick={validate}
                            sx={{ px: "8vh", py: "1.5vh" }}
                            variant="contained">
                            Register
                        </Button>
                        <br />
                        <FormControl className="mt-2">
                            <span> Already Registered? <Link className="mt-5 pt-4" to="/Login">Click here to Login</Link></span>
                            <span> want to go back Home <Link className="mt-5 pt-4" to="/">home</Link></span>
                        </FormControl>
                    </div>
                </CardContent>
            </Card>

        </Box>
    )
}