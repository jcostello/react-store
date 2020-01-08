const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return state.concat({...action.payload, quantity: 1})

    case 'INCREASE_PRODUCT':
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: product.quantity + 1 }
        }

        return product
      })

    case 'REMOVE_PRODUCT':
      return state.filter((product) => product.id === action.payload.id )

    case 'DECREASE_PRODUCT':
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: product.quantity - 1 }
        }

        return product
      })

    default:
      return state
  }
}

export default rootReducer