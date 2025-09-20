import React, { createContext, useReducer, useState } from 'react'
import type { ReactNode } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
}

interface CartContextType {
  items: CartItem[]
  totalUniqueItems: number
  totalPrice: number
  addItem: (product: { id: number; title: string; price: number; image: string; stock: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  showAlert: boolean
  alertType: 'success' | 'warning'
  alertMessage: string
  hideAlert: () => void
  showStockAlert: (productTitle: string) => void
  showSuccessAlert: (message: string) => void
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; title: string; price: number; image: string; stock: number } }
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
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'warning'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const addItem = (product: { id: number; title: string; price: number; image: string; stock: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
    setAlertType('success')
    setAlertMessage('Producto agregado correctamente')
    setShowAlert(true)

    // ocultar despues de 3 segundos
    setTimeout(() => setShowAlert(false), 3000)
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

  const hideAlert = () => setShowAlert(false)

  const showStockAlert = (productTitle: string) => {
  setAlertType('warning')
  setAlertMessage(`No hay más stock disponible para ${productTitle}`)
  setShowAlert(true)
  setTimeout(() => setShowAlert(false), 3000)
}

const showSuccessAlert = (message: string) => {
  setAlertType('success')
  setAlertMessage(message)
  setShowAlert(true)
  setTimeout(() => setShowAlert(false), 5000)
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
    clearCart,
    showAlert,
    alertType,
    alertMessage,
    hideAlert,
    showStockAlert,
    showSuccessAlert
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}