import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import ProductList from './../elements/ProductList'
import ProductBox from './../elements/ProductBox'

const Home = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data:products } = await axios.get('/api/products')

      console.log(products)
      setProducts(products)
    }

    setCart(getStorageCart())
    fetchProducts()
  }, [])

  const addProductToCart = (id) => {
    const product = products.find((product) => product.id === id)
    const productInCart = cart.find((product) => product.id === id)

    if (productInCart) {
      const newCart = cart.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 }
        }

        return product
      })

      setStorageCart(newCart)

    } else {
      setStorageCart(cart.concat({...product, quantity: 1}))
    }
  }

  const reduceProductFromCart = (id) => {
    const productInCart = cart.find((product) => product.id === id)

    if (productInCart) {
      let newCart

      if (productInCart.quantity === 1) {
        newCart = cart.filter((product) => product.id !== id)
      } else {
        newCart = cart.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 }
          }

          return product
        })
      }

      setStorageCart(newCart)
    }
  }

  const getStorageCart = () => {
    let productsString = localStorage.getItem('products')
    if (productsString) {
       return JSON.parse(productsString)
    }

    return []
  }

  const setStorageCart = (products) => {
    setCart(products)
    localStorage.setItem('products', JSON.stringify(products))
  }

  const cartQuantity = () => {
    return cart.reduce((prev, product) => prev + product.quantity, 0)
  }

  const productQuantity = (id) => {
    const productInCart = cart.find((product) => product.id === id)

    if (productInCart) {
      return productInCart.quantity
    }
    
    return 0
  }

  return (
    <div>
      <nav>
        <Link to='/cart' id='cart-link'>Cart ({cartQuantity()})</Link>
      </nav>
        <ProductList id='products'>
          { 
            products.map((product) => (
              <ProductBox key={product.id}>
                <p>{product.description} ({productQuantity(product.id)})</p>
                <button id='add' onClick={() => addProductToCart(product.id)}>Add</button>
                <button id='remove' onClick={() => reduceProductFromCart(product.id)}>Remove</button>
              </ProductBox>
            ))
          }
        </ProductList>
    </div>
  );
}

export default Home;
