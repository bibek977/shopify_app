import React from 'react'
import { useAppQuery } from '../hooks'

const products = () => {
    const {data, isLoading} = useAppQuery({url : "/products", reactQueryOptions:{
        onSuccess:data=>console.log('products', data)
    }})

  return (
    <div>{isLoading ? "Loading...":"Products"}</div>
  )
}

export default products