import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import SecondaryNavbar from './SecondaryNavbar'

// Mock
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('SecondaryNavbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar todas las tabs correctamente', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Summary')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('deberia mostrar la tab activa correctamente', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('deberia navegar a /products cuando se hace click en Products tab', () => {
    renderWithRouter(<SecondaryNavbar activeTab="orders" />)
    
    const productsTab = screen.getByText('Products')
    fireEvent.click(productsTab)
    
    expect(mockNavigate).toHaveBeenCalledWith('/products')
  })

  it('deberia navegar a /cart cuando se hace click en Summary tab', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const summaryTab = screen.getByText('Summary')
    fireEvent.click(summaryTab)
    
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  it('deberia navegar a /profile cuando se hace click en Profile tab', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const profileTab = screen.getByText('Profile')
    fireEvent.click(profileTab)
    
    expect(mockNavigate).toHaveBeenCalledWith('/profile')
  })

  it('deberia renderizar el input de busqueda con placeholder correcto', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  it('deberia actualizar el valor del input cuando se escribe', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    fireEvent.change(searchInput, { target: { value: 'test query' } })
    
    expect(searchInput).toHaveValue('test query')
  })

  it('deberia mostrar boton de limpiar cuando hay texto en el input', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    const clearButton = screen.getByLabelText('Limpiar búsqueda')
    expect(clearButton).toBeInTheDocument()
  })

  it('deberia limpiar el input cuando se hace click en el boton de limpiar', () => {
    const mockClearSearch = vi.fn()
    renderWithRouter(
      <SecondaryNavbar activeTab="products" onClearSearch={mockClearSearch} />
    )
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    const clearButton = screen.getByLabelText('Limpiar búsqueda')
    fireEvent.click(clearButton)
    
    expect(searchInput).toHaveValue('')
    expect(mockClearSearch).toHaveBeenCalled()
  })

  it('deberia mostrar error cuando la busqueda tiene menos de 3 caracteres', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    fireEvent.change(searchInput, { target: { value: 'ab' } })
    fireEvent.click(searchButton)
    
    expect(screen.getByText('Mínimo son 3 caracteres')).toBeInTheDocument()
  })

  it('deberia llamar onSearch cuando la busqueda es valida', () => {
    const mockSearch = vi.fn()
    renderWithRouter(
      <SecondaryNavbar activeTab="products" onSearch={mockSearch} />
    )
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    fireEvent.change(searchInput, { target: { value: 'valid search' } })
    fireEvent.click(searchButton)
    
    expect(mockSearch).toHaveBeenCalledWith('valid search')
  })

  it('deberia funcionar correctamente con el boton de busqueda', () => {
    const mockSearch = vi.fn()
    renderWithRouter(
      <SecondaryNavbar activeTab="products" onSearch={mockSearch} />
    )
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    fireEvent.change(searchInput, { target: { value: 'button search' } })
    fireEvent.click(searchButton)
    
    expect(mockSearch).toHaveBeenCalledWith('button search')
  })

  it('deberia limpiar error cuando el input tiene 3 o mas caracteres', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    // Crear error primero
    fireEvent.change(searchInput, { target: { value: 'ab' } })
    fireEvent.click(searchButton)
    expect(screen.getByText('Mínimo son 3 caracteres')).toBeInTheDocument()
    
    // Limpiar error
    fireEvent.change(searchInput, { target: { value: 'abc' } })
    expect(screen.queryByText('Mínimo son 3 caracteres')).not.toBeInTheDocument()
  })

  it('deberia inicializar con searchValue cuando se proporciona', () => {
    renderWithRouter(
      <SecondaryNavbar activeTab="products" searchValue="initial value" />
    )
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    expect(searchInput).toHaveValue('initial value')
  })

  it('deberia renderizar el icono de busqueda', () => {
    renderWithRouter(<SecondaryNavbar activeTab="products" />)
    
    expect(screen.getByText('search')).toBeInTheDocument()
  })

  it('deberia manejar busqueda con espacios en blanco', () => {
    const mockSearch = vi.fn()
    renderWithRouter(
      <SecondaryNavbar activeTab="products" onSearch={mockSearch} />
    )
    
    const searchInput = screen.getByPlaceholderText('Search any things')
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    fireEvent.change(searchInput, { target: { value: '  trimmed  ' } })
    fireEvent.click(searchButton)
    
    expect(mockSearch).toHaveBeenCalledWith('trimmed')
  })
})