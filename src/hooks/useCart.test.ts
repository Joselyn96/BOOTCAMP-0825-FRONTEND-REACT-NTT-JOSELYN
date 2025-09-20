import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useContext } from 'react'
import { useCart } from './useCart'

// mock del contexto
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useContext: vi.fn()
  }
})

describe('useCart Hook', () => {
  const mockUseContext = vi.mocked(useContext)
  
  const mockCartContext = {
    items: [],
    totalUniqueItems: 0,
    totalPrice: 0,
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    showAlert: false,
    alertType: 'success' as const,
    alertMessage: '',
    hideAlert: vi.fn(),
    showStockAlert: vi.fn(),
    showSuccessAlert: vi.fn()
  }

  it('deberia retornar el contexto del carrito cuando esta disponible', () => {
    mockUseContext.mockReturnValue(mockCartContext)
    
    const { result } = renderHook(() => useCart())
    
    expect(result.current).toBe(mockCartContext)
  })

  it('deberia mostrar error cuando se usa fuera del CartProvider', () => {
    mockUseContext.mockReturnValue(undefined)
    
    expect(() => {
      renderHook(() => useCart())
    }).toThrowError('useCart must be used within a CartProvider')
  })

  it('deberia llamar useContext con CartContext', () => {
    mockUseContext.mockReturnValue(mockCartContext)
    
    renderHook(() => useCart())
    
    expect(mockUseContext).toHaveBeenCalledWith(expect.anything())
  })

  it('deberia retornar todas las propiedades del contexto', () => {
    const fullMockContext = {
      items: [{ id: 1, title: 'Product 1', price: 10, image: 'image.jpg', quantity: 2, stock: 5 }],
      totalUniqueItems: 1,
      totalPrice: 20,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      showAlert: true,
      alertType: 'success' as const,
      alertMessage: 'Test message',
      hideAlert: vi.fn(),
      showStockAlert: vi.fn(),
      showSuccessAlert: vi.fn()
    }
    
    mockUseContext.mockReturnValue(fullMockContext)
    
    const { result } = renderHook(() => useCart())
    
    expect(result.current.items).toEqual(fullMockContext.items)
    expect(result.current.totalUniqueItems).toBe(1)
    expect(result.current.totalPrice).toBe(20)
    expect(result.current.addItem).toBe(fullMockContext.addItem)
    expect(result.current.removeItem).toBe(fullMockContext.removeItem)
    expect(result.current.updateQuantity).toBe(fullMockContext.updateQuantity)
    expect(result.current.clearCart).toBe(fullMockContext.clearCart)
    expect(result.current.showAlert).toBe(true)
    expect(result.current.alertType).toBe('success')
    expect(result.current.alertMessage).toBe('Test message')
  })

  it('deberia manejar contexto con carrito vacio', () => {
    const emptyCartContext = {
      items: [],
      totalUniqueItems: 0,
      totalPrice: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      showAlert: false,
      alertType: 'success' as const,
      alertMessage: '',
      hideAlert: vi.fn(),
      showStockAlert: vi.fn(),
      showSuccessAlert: vi.fn()
    }
    
    mockUseContext.mockReturnValue(emptyCartContext)
    
    const { result } = renderHook(() => useCart())
    
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalUniqueItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
    expect(result.current.showAlert).toBe(false)
  })
})