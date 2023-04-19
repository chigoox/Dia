import React, { useEffect, useState } from 'react'
import LIGHT from '../assets/Lighter.jpeg'

function Shop() {

    const [PRODUCTDATA, SETPRODUCTDATA] = useState()




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
            {PRODUCTDATA && PRODUCTDATA.map((item) => {
                console.log(item)
                return (
                    <div className='flex items-center justify-center h-fit w-72 flex-col bg-black-900 shadow rounded-lg'>
                        <div key={item.name} className='h-64 w-64'>
                            <img src={item.images[0]} className='' alt="" />
                        </div>
                        <div className=''>
                            <p className='text-center text-6xl font-bold'>{item.name}</p>
                            <div className='flex gap-2 items-center justify-center'>
                                <p className='text-center text-4xl font-bold'>{item.metadata.price}</p>
                                <p className='text-center font-bold'>{item.metadata.OGPrice}</p>
                            </div>
                        </div>
                        <div className='center mt-4'>
                            <button onClick={() => {
                                checkOut(item.default_price)
                            }} className='h-20 w-64 rounded-lg bg-blue-600 hover:bg-blue-400 trans-slow text-3xl font-bold'>Buy</button>
                        </div>
                    </div>
                )
            })}



        </div>
    )
}

export default Shop