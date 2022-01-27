import React,{useState} from 'react'
import { placeOrder } from '../Config/Myservices'
import { useNavigate, Navigate } from 'react-router'
import Navbaar from './Navbaar'

function Order() {
    const navigate = useNavigate()
    const [card, setcard] = useState({no:"", error:""})

    const checkout = () => {
        if (card.no.length === 16) {
            let data = JSON.parse(localStorage.getItem("order" ))
            placeOrder(data)
            localStorage.setItem('cart', JSON.stringify([]))
            alert("Order PLaced")
            navigate("/cart")
        }
        else {
            // setcard({...card,error:"Enter 16 digit number",flag:false})
            setcard({...card,error:"enter"})
        }
    }
    return (
        <div>
            <Navbaar />
            <>
                            <div className="container">
                                {card.error.length >0 && 
                                <div class="alert alert-danger" role="alert">
                                    {card.error}
                                </div>}
                                <h1>Checkout</h1>
                                <form>
                                    <div class="form-group">
                                        <label>Credit Card Number</label>
                                        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Card details " onChange={e => setcard( {...card,no:e.target.value})} />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    {/* <h5>Order Total:{data.price}</h5> */}
                                    <button className="btn btn-secondary" onClick={() => checkout()}>Checkout</button>
                                </form>
                            </div>
                        </>
        </div>
    )
}

export default Order
