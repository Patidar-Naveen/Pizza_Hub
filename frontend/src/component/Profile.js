import React, { useEffect, useState } from 'react'
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Box } from '@mui/system'
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router';
import jwt_decode from 'jwt-decode';
import { allorders } from '../Config/Myservices'
import Navbaar from './Navbaar'

export default function AllOrders() {
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [user, setuser] = useState('')
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setuser(decode.uid)
            allorders().then(res => {
                setdata(res.data)
            })
        }

    }, [])
    return (
        <>
        {localStorage.getItem('_token') != undefined ? 
        <>
            <Navbaar />
            <h5 className="text-center">user : {user}</h5>
            <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <TableContainer component={Paper} sx={{ width: 450 }}>
                    <Table sx={{ miWidth: 350 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S No</TableCell>
                                <TableCell align="center">Email Id</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length != 0 ?
                                data.map((ele, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{ele.details}</TableCell>
                                        <TableCell align="right">{ele.price}</TableCell>
                                        <TableCell align="right">{ele.status}</TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan='3' align="center">No privious order</TableCell>
                                    <TableCell align="right"><Button onClick={() => navigate('/Dash')} variant="contained" color="success">
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