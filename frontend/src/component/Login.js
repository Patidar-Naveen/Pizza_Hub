import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, Button, TextField, FormControl, Alert, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import '../App.css'
import mystyles from './css'
import { useNavigate } from "react-router";
import { fetchdata,validation } from '../Config/Myservices'
export default function Login() {
    const navigate = useNavigate();
    const [state, setstate] = useState({ email: '', password: '', error: '' })


      const checkdata=()=>{
        validation({email:state.email,password :state.password})
        .then(res=>{
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
              
                localStorage.setItem('cart',JSON.stringify([]));
               navigate("/Dash")
            }
            if(res.data.err==1){
                alert("Email or Password does not match")
            }
        })
        
      }

    return (
        <Box className="backimg" sx={{ width: "100%", height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Card className="blur" sx={{ width: "50ch", color: 'white' }}>
                {state.error.length > 0 && <Alert severity="error">{state.error}</Alert>}
                <CardContent>
                    <h1 style={{ textAlign: "center" }}>
                        Login Page
                    </h1>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <TextField
                            sx={mystyles}
                            name="email"
                            onChange={e => setstate({ ...state, email: e.target.value })}
                            label="Email"
                        />
                    </FormControl>

                    <FormControl sx={{ my: 1 }} fullWidth>
                        <TextField
                            sx={mystyles}
                            name="password"
                            onChange={e => setstate({ ...state, password: e.target.value })}
                            type="password"
                            label="Password"
                        />
                    </FormControl>

                    <div className="text-center mt-1">
                        <Button
                            onClick={checkdata}
                            fullWidth
                            sx={{ py: "1.5vh" }}
                            variant="contained">
                            Login
                        </Button>
                        <br />

                        <FormControl className="mt-2">
                            <p className="mt-2 text-center">Don't have an account? <Link className="mt-5 pt-4" to="/registration">Sign Up</Link></p>
                        </FormControl>
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}