import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CategoryFilter from './CategoryFilter'

// mock del contexto ProductsContext
const mockLoadAllProducts = vi.fn()

const mockProductsData = [
  { id: 1, title: 'iPhone', category: 'smartphones', price: 999 },
  { id: 2, title: 'MacBook', category: 'laptops', price: 1999 },
  { id: 3, title: 'Lipstick', category: 'beauty', price: 25 },
  { id: 4, title: 'iPad', category: 'tablets', price: 599 },
  { id: 5, title: 'Sofa', category: 'furniture', price: 899 },
  { id: 6, title: 'Apples', category: 'groceries', price: 5 },
  { id: 7, title: 'T-Shirt', category: 'mens-shirts', price: 29 },
  { id: 8, title: 'Android Phone', category: 'smartphones', price: 799 }
]

let mockUseProducts = {
  allProducts: mockProductsData,
  loadAllProducts: mockLoadAllProducts
}

vi.mock('../../contexts/ProductsContext', () => ({
  useProducts: () => mockUseProducts
}))

describe('CategoryFilter Component', () => {
  const mockOnCategoryChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset mock state
    mockUseProducts = {
      allProducts: mockProductsData,
      loadAllProducts: mockLoadAllProducts
    }
  })

  it('deberia renderizar el titulo Categories', () => {
    render(<CategoryFilter />)
    
    expect(screen.getByText('Categories')).toBeInTheDocument()
  })

  it('deberia cargar productos al montar', () => {
    render(<CategoryFilter />)
    
    expect(mockLoadAllProducts).toHaveBeenCalledTimes(1)
  })

  it('deberia mostrar todas las categorias con conteos correctos', () => {
    render(<CategoryFilter />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Beauty')).toBeInTheDocument()
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    
    // verificar que hay conteos numericos
    const counts = screen.getAllByText(/^\d+$/)
    expect(counts.length).toBeGreaterThan(0)
  })

  it('deberia mostrar categoria All categories como activa por defecto', () => {
    render(<CategoryFilter />)
    
    const allCategoriesItem = screen.getByText('All categories').closest('li')
    expect(allCategoriesItem).toHaveClass('active')
  })

  it('deberia cambiar categoria activa al hacer click', () => {
    render(<CategoryFilter onCategoryChange={mockOnCategoryChange} />)
    
    const beautyCategory = screen.getByText('Beauty')
    fireEvent.click(beautyCategory)
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('beauty')
    
    const beautyItem = beautyCategory.closest('li')
    expect(beautyItem).toHaveClass('active')
  })

  it('deberia manejar click en diferentes categorias', () => {
    render(<CategoryFilter onCategoryChange={mockOnCategoryChange} />)
    
    // click en Smartphones
    fireEvent.click(screen.getByText('Smartphones'))
    expect(mockOnCategoryChange).toHaveBeenCalledWith('smartphones')
    
    // click en Laptops
    fireEvent.click(screen.getByText('Laptops'))
    expect(mockOnCategoryChange).toHaveBeenCalledWith('laptops')
    
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(2)
  })

  it('deberia mostrar conteo 0 para categorias sin productos', () => {
    mockUseProducts.allProducts = []
    
    render(<CategoryFilter />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    
    // verificar que hay conteos de 0
    const zeroCounts = screen.getAllByText('0')
    expect(zeroCounts.length).toBeGreaterThan(0)
  })

  it('deberia calcular conteos correctamente con productos duplicados por categoria', () => {
    mockUseProducts.allProducts = [
      { id: 1, title: 'iPhone 13', category: 'smartphones', price: 999 },
      { id: 2, title: 'iPhone 14', category: 'smartphones', price: 1099 },
      { id: 3, title: 'Samsung Galaxy', category: 'smartphones', price: 899 }
    ]
    
    render(<CategoryFilter />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    
    // Verificar que hay exactamente dos elementos con 3
    const threeCounts = screen.getAllByText('3')
    expect(threeCounts).toHaveLength(2)
  })

  it('deberia funcionar sin onCategoryChange callback', () => {
    render(<CategoryFilter />)
    
    const beautyCategory = screen.getByText('Beauty')
    
    // no deberia lanzar error sin callback
    expect(() => {
      fireEvent.click(beautyCategory)
    }).not.toThrow()
  })

  it('deberia toggle dropdown en mobile', () => {
    // mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })
    
    render(<CategoryFilter onCategoryChange={mockOnCategoryChange} />)
    
    const header = screen.getByText('Categories')
    fireEvent.click(header)
    
    // click en una categoria deberia cerrar el dropdown en movil
    fireEvent.click(screen.getByText('Beauty'))
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('beauty')
  })

  it('deberia renderizar todas las categorias esperadas', () => {
    render(<CategoryFilter />)
    
    const expectedCategories = [
      'All categories',
      'Beauty',
      'Laptops', 
      'Smartphones',
      'Furniture',
      'Groceries',
      'Tablets',
      "Men's Shirts"
    ]
    
    expectedCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('deberia manejar productos con categorias no definidas', () => {
    mockUseProducts.allProducts = [
      { id: 1, title: 'Unknown Product', category: 'unknown', price: 100 }
    ]
    
    render(<CategoryFilter />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // total count
  })

  it('deberia actualizar conteos cuando cambian los productos', () => {
    const { rerender } = render(<CategoryFilter />)
    
    // cmbiar datos del mock
    mockUseProducts.allProducts = [
      { id: 1, title: 'New Phone', category: 'smartphones', price: 899 }
    ]
    
    rerender(<CategoryFilter />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    
    // verificar que hay exactamente dos elementos con 1
    const oneCounts = screen.getAllByText('1')
    expect(oneCounts).toHaveLength(2)
  })

  it('deberia manejar nombres de categoria con caracteres especiales', () => {
    render(<CategoryFilter />)
    
    expect(screen.getByText("Men's Shirts")).toBeInTheDocument()
  })

  it('deberia mantener estado activo independiente del callback', () => {
    render(<CategoryFilter onCategoryChange={mockOnCategoryChange} />)
    
    // click inicial
    fireEvent.click(screen.getByText('Laptops'))
    expect(screen.getByText('Laptops').closest('li')).toHaveClass('active')
    
    // otro click
    fireEvent.click(screen.getByText('Beauty'))
    expect(screen.getByText('Beauty').closest('li')).toHaveClass('active')
    expect(screen.getByText('Laptops').closest('li')).not.toHaveClass('active')
  })

  it('deberia renderizar estructura completa del componente', () => {
    render(<CategoryFilter />)
    
    // Header
    expect(screen.getByText('Categories')).toBeInTheDocument()
    
    // todas las categorias
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Beauty')).toBeInTheDocument()
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    
    // conteos numericos
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})