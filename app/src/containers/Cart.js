import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(getStorageCart())
  }, [])

  const productQuantity = (id) => {
    const productInCart = cart.find((product) => product.id === id)

    if (productInCart) {
      return productInCart.quantity
    }
    
    return 0
  }

  const getStorageCart = () => {
    let productsString = localStorage.getItem('products')
    if (productsString) {
       return JSON.parse(productsString)
    }

    return []
  }

  return (
    <div>
      <ul id='products'>
        { 
          cart.map((product) => (
            <li key={product.id}>
              <p>{product.description} ({productQuantity(product.id)})</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Cart;
