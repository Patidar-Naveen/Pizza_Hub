import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { getPosts } from '../Config/Myservices'
import Navbaar from './Navbaar'
export default function Dash() {
  const [state, setstate] = useState([])
  const [cart, setcart] = useState(0)

  const refresh = async () => {
    if (localStorage.getItem('_token') != undefined) {
      await getPosts().then(res => {
        setstate(res.data)
      })
      let items = JSON.parse(localStorage.getItem('cart'))
      let sum = 0
      if (items.length != 0) {
        items.forEach(ele => {
          sum += ele.quantity
        })
      }
      setcart(sum)
    }
  }
  useEffect(() => {
    refresh()
  }, [])

  const addincart = (ele) => {
    let data = JSON.parse(localStorage.getItem('cart'))
    let flag = data.filter(item => item.name === ele.name)
    if (flag.length === 0) {
      let details = { name: ele.name, price: ele.price, quantity: 1 }
      data.push(details)
      localStorage.setItem('cart', JSON.stringify(data));
      alert("Item added succesfully!!")
    }
    else {
      data.map((e, index) => {
        if (e.name === ele.name) {
          data[index].quantity += 1
          data[index].price *= data[index].quantity
          localStorage.setItem('cart', JSON.stringify(data));
          alert("Incremented Succesfully")
        }
      })
    }
    refresh();
  }

  return (
    <>
      {localStorage.getItem('_token') != undefined ?
        <>
          <Navbaar cart={cart} />
          <div className="container mt-3">
            <div>
              <div className="row d-flex justify-content-around">
                {state.map((ele, index) =>
                  <div key={index} className="col-lg-4 my-2">
                    <div className="card" style={{ width: "300px" }}>
                      <img className="mx-auto" src={ele.path} height="250px" width="280px" alt="..." />
                      <div className="card-body">
                        <h3 className="card-title text-center">{ele.name}</h3>

                        <button className="btn btn-primary px-4" onClick={() => addincart(ele)}>Add Cart</button>
                        <span style={{ marginLeft: "30px", fontSize: '20px' }}>Price ${ele.price}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
        :
        <Navigate to="/"></Navigate>}
    </>


  )
}