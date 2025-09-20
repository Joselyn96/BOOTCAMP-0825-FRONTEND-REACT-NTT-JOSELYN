import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CartProvider, CartContext } from './CartContext'
import { useContext } from 'react'

// Mock timers
vi.useFakeTimers()

// Componente test
const TestComponent = () => {
  const cart = useContext(CartContext)
  
  if (!cart) throw new Error('Cart context not found')
  
  return (
    <div>
      <div data-testid="items-count">{cart.items.length}</div>
      <div data-testid="unique-items">{cart.totalUniqueItems}</div>
      <div data-testid="total-price">{cart.totalPrice}</div>
      <div data-testid="show-alert">{cart.showAlert.toString()}</div>
      <div data-testid="alert-type">{cart.alertType}</div>
      <div data-testid="alert-message">{cart.alertMessage}</div>
      
      <button 
        data-testid="add-item"
        onClick={() => cart.addItem({
          id: 1,
          title: 'Test Product',
          price: 100,
          image: 'test.jpg',
          stock: 5
        })}
      >
        Add Item
      </button>
      
      <button 
        data-testid="add-same-item"
        onClick={() => cart.addItem({
          id: 1,
          title: 'Test Product',
          price: 100,
          image: 'test.jpg',
          stock: 5
        })}
      >
        Add Same Item
      </button>
      
      <button 
        data-testid="remove-item"
        onClick={() => cart.removeItem(1)}
      >
        Remove Item
      </button>
      
      <button 
        data-testid="update-quantity"
        onClick={() => cart.updateQuantity(1, 3)}
      >
        Update Quantity
      </button>
      
      <button 
        data-testid="update-zero"
        onClick={() => cart.updateQuantity(1, 0)}
      >
        Update Zero
      </button>
      
      <button 
        data-testid="clear-cart"
        onClick={() => cart.clearCart()}
      >
        Clear Cart
      </button>
      
      <button 
        data-testid="hide-alert"
        onClick={() => cart.hideAlert()}
      >
        Hide Alert
      </button>
      
      <button 
        data-testid="stock-alert"
        onClick={() => cart.showStockAlert('Test Product')}
      >
        Stock Alert
      </button>
      
      <button 
        data-testid="success-alert"
        onClick={() => cart.showSuccessAlert('Success message')}
      >
        Success Alert
      </button>

      {cart.items.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          <span data-testid={`item-title-${item.id}`}>{item.title}</span>
          <span data-testid={`item-quantity-${item.id}`}>{item.quantity}</span>
          <span data-testid={`item-price-${item.id}`}>{item.price}</span>
        </div>
      ))}
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('debe inicializar con valores por defecto', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('')
  })

  it('debe agregar un item nuevo', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('100')
    expect(screen.getByTestId('item-title-1')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
  })

  it('debe incrementar cantidad de item existente', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Agregar mismo item
    act(() => {
      screen.getByTestId('add-same-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('200')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('2')
  })

  it('debe mostrar alerta de exito al agregar item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('Producto agregado correctamente')
  })

  it('debe ocultar alerta automaticamente despues de 3 segundos', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe remover item del carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')

    // Remover item
    act(() => {
      screen.getByTestId('remove-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
  })

  it('debe actualizar cantidad de item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Actualizar cantidad
    act(() => {
      screen.getByTestId('update-quantity').click()
    })

    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('3')
    expect(screen.getByTestId('total-price')).toHaveTextContent('300')
  })

  it('debe mantener cantidad minima de 1', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Intentar actualizar a 0
    act(() => {
      screen.getByTestId('update-zero').click()
    })

    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('100')
  })

  it('debe limpiar todo el carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar items
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')

    // Limpiar carrito
    act(() => {
      screen.getByTestId('clear-cart').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
  })

  it('debe ocultar alerta manualmente', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Mostrar alerta
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    // Ocultar alerta
    act(() => {
      screen.getByTestId('hide-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe mostrar alerta de stock', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('stock-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('warning')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('No hay más stock disponible para Test Product')
  })

  it('debe mostrar alerta de exito personalizada', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('success-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('Success message')
  })

  it('debe ocultar alerta de exito despues de 5 segundos', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('success-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe calcular precio total correctamente con multiples items', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item dos veces
    act(() => {
      screen.getByTestId('add-item').click()
    })
    act(() => {
      screen.getByTestId('add-same-item').click()
    })

    // Actualizar cantidad a 5
    act(() => {
      screen.getByTestId('update-quantity').click() // cantidad = 3
    })

    expect(screen.getByTestId('total-price')).toHaveTextContent('300')
  })

  it('debe mantener estructura de item completa', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('item-title-1')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('item-price-1')).toHaveTextContent('100')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
  })

})

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('debe inicializar con valores por defecto', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('')
  })

  it('debe agregar un item nuevo', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('100')
    expect(screen.getByTestId('item-title-1')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
  })

  it('debe incrementar cantidad de item existente', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Agregar mismo item
    act(() => {
      screen.getByTestId('add-same-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('unique-items')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('200')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('2')
  })

  it('debe mostrar alerta de exito al agregar item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('Producto agregado correctamente')
  })

  it('debe ocultar alerta automaticamente despues de 3 segundos', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe remover item del carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')

    // Remover item
    act(() => {
      screen.getByTestId('remove-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
  })

  it('debe actualizar cantidad de item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Actualizar cantidad
    act(() => {
      screen.getByTestId('update-quantity').click()
    })

    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('3')
    expect(screen.getByTestId('total-price')).toHaveTextContent('300')
  })

  it('debe mantener cantidad minima de 1', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item
    act(() => {
      screen.getByTestId('add-item').click()
    })

    // Intentar actualizar a 0
    act(() => {
      screen.getByTestId('update-zero').click()
    })

    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('100')
  })

  it('debe limpiar todo el carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar items
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')

    // Limpiar carrito
    act(() => {
      screen.getByTestId('clear-cart').click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
  })

  it('debe ocultar alerta manualmente', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Mostrar alerta
    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    // Ocultar alerta
    act(() => {
      screen.getByTestId('hide-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe mostrar alerta de stock', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('stock-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('warning')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('No hay más stock disponible para Test Product')
  })

  it('debe mostrar alerta de exito personalizada', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('success-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')
    expect(screen.getByTestId('alert-type')).toHaveTextContent('success')
    expect(screen.getByTestId('alert-message')).toHaveTextContent('Success message')
  })

  it('debe ocultar alerta de exito despues de 5 segundos', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('success-alert').click()
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('true')

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.getByTestId('show-alert')).toHaveTextContent('false')
  })

  it('debe calcular precio total correctamente con multiples items', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Agregar item dos veces
    act(() => {
      screen.getByTestId('add-item').click()
    })
    act(() => {
      screen.getByTestId('add-same-item').click()
    })

    // Actualizar cantidad a 5
    act(() => {
      screen.getByTestId('update-quantity').click() // cantidad = 3
    })

    expect(screen.getByTestId('total-price')).toHaveTextContent('300')
  })

  it('debe mantener estructura de item completa', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByTestId('add-item').click()
    })

    expect(screen.getByTestId('item-title-1')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('item-price-1')).toHaveTextContent('100')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
  })
})