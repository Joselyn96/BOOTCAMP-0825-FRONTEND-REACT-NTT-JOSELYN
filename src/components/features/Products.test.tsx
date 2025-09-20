import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Products from './Products'

// mock de todos los hooks y contextos
vi.mock('../../contexts/ProductsContext', () => ({
  useProducts: () => ({
    allProducts: [
      {
        id: 1,
        title: 'Test Product 1',
        price: 100,
        thumbnail: '/test1.jpg',
        category: 'electronics',
        stock: 10
      }
    ],
    isLoading: false,
    error: null,
    loadAllProducts: vi.fn()
  })
}))

vi.mock('../../hooks/useCart', () => ({
  useCart: () => ({
    addItem: vi.fn(),
    totalUniqueItems: 3,
    items: [],
    showStockAlert: vi.fn(),
    showAlert: false,
    alertType: 'success',
    alertMessage: ''
  })
}))

vi.mock('../../hooks/usepagination', () => ({
  default: () => ({
    currentPage: 1,
    skip: 0,
    visiblePages: [1],
    hasPrevGroup: false,
    hasNextGroup: false,
    goToPage: vi.fn(),
    goToPrevGroup: vi.fn(),
    goToNextGroup: vi.fn()
  })
}))

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { username: 'testuser' },
    logout: vi.fn()
  })
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Products Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar el componente sin errores', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
  })

  it('deberia renderizar la navegacion', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search any things')).toBeInTheDocument()
  })

  it('deberia mostrar el cart count', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('deberia renderizar productos', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    expect(screen.getByText('$100.00')).toBeInTheDocument()
  })

  it('deberia tener botones de agregar al carrito', () => {
    renderWithRouter(<Products />)
    
    const addButton = screen.getByText('Add to cart')
    expect(addButton).toBeInTheDocument()
  })

  it('deberia permitir hacer busqueda', () => {
    renderWithRouter(<Products />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    expect(searchInput).toHaveValue('test')
  })

  it('deberia tener boton de busqueda', () => {
    renderWithRouter(<Products />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()
  })

  it('deberia mostrar categorias', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
  })

  it('deberia renderizar imagenes de productos', () => {
    renderWithRouter(<Products />)
    
    const productImage = screen.getByAltText('Test Product 1')
    expect(productImage).toBeInTheDocument()
    expect(productImage).toHaveAttribute('src', '/test1.jpg')
  })

  it('deberia mostrar el precio formateado', () => {
    renderWithRouter(<Products />)
    
    expect(screen.getByText('$100.00')).toBeInTheDocument()
  })
})