import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Box } from '@mui/system'
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router'
import Navbaar from './Navbaar'
import { placeOrder } from '../Config/Myservices';

let error = '';

export default function Cart() {
    const navigate = useNavigate()
    const [state, setstate] = useState([])
    const [total, setTotal] = useState(0)
    const [cart, setcart] = useState(0)

    const refresh = () => {
        if (localStorage.getItem('cart') != undefined) {

            setstate(JSON.parse(localStorage.getItem('cart')));
            let cartDetails = JSON.parse(localStorage.getItem('cart'));
            let sum = 0;
            cartDetails.forEach(ele => {
                sum += ele.price
            })
            setTotal(sum)
            sum = 0
            if (cartDetails.length != 0) {
                cartDetails.forEach(ele => {
                    sum += ele.quantity
                })
            }
            setcart(sum)
        }
    }
    useEffect(() => {
        refresh()
    }, [])

    const order = () => {
    let user = localStorage.getItem('_token')
    let decode = jwt_decode(user)
    let data = {
        details: decode.uid,
        price: total,
        status: "delivered"
    }
    localStorage.setItem('order', JSON.stringify(data))

    navigate('/order')
    }
    const deleteData = (index) => {
        state.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state))
        refresh()

    }
    
    return (

        <>
            {localStorage.getItem('_token') != undefined ?
                <>
                    <Navbaar cart={cart} />
            
                    
                            <h2 className='text-center'>Cart</h2>
                            <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <TableContainer component={Paper} sx={{ width: 450 }}>
                                    <Table sx={{ miWidth: 350 }} aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S No</TableCell>
                                                <TableCell align="right">Pizza Name</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.map((ele, index) => (
                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="right">{ele.name}</TableCell>
                                                    <TableCell align="right">{ele.price}</TableCell>
                                                    <TableCell align="right">{ele.quantity}</TableCell>
                                                    <TableCell align="right"><Button onClick={() => deleteData(index)} variant="outlined" color="error">
                                                        Delete
                                                    </Button></TableCell>
                                                </TableRow>
                                            ))}
                                            {total === 0 ?
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                    <TableCell colSpan='4' align="center">No data In Cart</TableCell>
                                                    <TableCell align="right"><Button onClick={() => navigate('/Dash')} variant="contained" color="success">
                                                        Order
                                                    </Button>
                                                    </TableCell>
                                                </TableRow>
                                                :
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                    <TableCell colSpan='2' align="right">Your total :</TableCell>
                                                    <TableCell colSpan='2' align="left">{total}</TableCell>
                                                    <TableCell align="right"><Button onClick={() => order()} variant="contained" color="success">
                                                        Order
                                                    </Button>
                                                    </TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        
                        
                    
                </>
                :
                <Navigate to="/"></Navigate>}


        </>
    )
}