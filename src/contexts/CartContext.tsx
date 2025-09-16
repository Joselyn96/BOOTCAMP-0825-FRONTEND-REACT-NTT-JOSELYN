import React, { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

interface CartContextType {
  items: CartItem[]
  totalUniqueItems: number
  totalPrice: number
  addItem: (product: { id: number; title: string; price: number; image: string }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; title: string; price: number; image: string } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

export const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      } else {
        return {
          items: [...state.items, { ...action.payload, quantity: 1 }]
        }
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY': {
      // Mantener cantidad mínima de 1
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: 1 }
              : item
          )
        }
      }
      
      return {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    }
    
    case 'CLEAR_CART':
      return { items: [] }
    
    default:
      return state
  }
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addItem = (product: { id: number; title: string; price: number; image: string }) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalUniqueItems = state.items.length
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)

  const contextValue: CartContextType = {
    items: state.items,
    totalUniqueItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}