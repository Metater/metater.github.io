import React, { useEffect, useState } from 'react'
import Axios from 'axios'
 
export function BitcoinPrice() {
 
    const [Price, setPrice] = useState("")
 
    useEffect(() => {
        Axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
        .then(response => {
            setPrice(response.data.data.amount)
        })
    }, [])
 
    return (
        <div>
            Current Bitcoin Price: ${Price}
        </div>
    )
}