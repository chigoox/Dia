import React, { useEffect, useState } from 'react'
import LIGHT from '../assets/Lighter.jpeg'

function Shop() {

    const [PRODUCTDATA, SETPRODUCTDATA] = useState()


    console.log(PRODUCTDATA)
    const product = [
        {
            name: 'light',
            price: 19.95,
            OGPrice: 34.95,
            priceID: 1232,
        }
    ]

    async function fetchProuductsFromStripe() {
        fetch('/.netlify/functions/FetchProducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            res.json().then(res => {
                const { products } = res
                SETPRODUCTDATA(products)
            })
        })
    }


    const checkOut = async (price) => {
        const STRIPE_CART = { quantity: 1, price: price }

        fetch('/.netlify/functions/CheckOut', {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart: STRIPE_CART
            })
        }).then(res => {
            res.json().then(res => {

                window.location.href = res.url

            })
        })
    }

    useEffect(() => {
        const fetch = async () => { await fetchProuductsFromStripe() }
        fetch().then(

        )
    }, [])



    return (
        <div className=' h-screen gap-40 md:grid-cols-2 grid-cols-1 lg:grid-cols-4 p-12 mt-12 grid grid-flow-row'>
            {product.map((item) => {
                return (
                    <div className='flex items-center flex-col'>
                        <div key={item.name} className='h-64 w-64'>
                            <img src={LIGHT} className='' alt="" />
                        </div>
                        <div className=''>
                            <p className='text-center text-6xl font-bold'>{item.name}</p>
                            <div className='flex gap-2 items-center justify-center'>
                                <p className='text-center text-4xl font-bold'>{item.price}</p>
                                <p className='text-center font-bold'>{item.OGPrice}</p>
                            </div>
                        </div>
                        <div className='center mt-4'>
                            <button onClick={() => { checkOut(item.priceID) }} className='h-20 w-64 rounded-lg bg-blue-600 hover:bg-blue-400 trans-slow text-3xl font-bold'>Buy</button>
                        </div>
                    </div>
                )
            })}



        </div>
    )
}

export default Shop