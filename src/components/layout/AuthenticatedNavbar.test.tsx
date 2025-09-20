import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import AuthenticatedNavbar from './AuthenticateNavbar'

// mocks
const mockLogout = vi.fn()
const mockNavigate = vi.fn()

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: { username: 'testuser' },
    logout: mockLogout
  }))
}))

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

describe('AuthenticatedNavbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar informacion del usuario de manera correcta', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('person')).toBeInTheDocument()
  })

  it('deberia renderizar todos los iconos de manera correcta', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    expect(screen.getByText('person')).toBeInTheDocument()
    expect(screen.getByText('favorite')).toBeInTheDocument()
    expect(screen.getByText('shopping_cart')).toBeInTheDocument()
    expect(screen.getByText('logout')).toBeInTheDocument()
  })

  it('deberia mostrar el badge del carrito cuando hay items', () => {
    renderWithRouter(<AuthenticatedNavbar cartItemCount={5} />)
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('no deberia mostrar el badge del carrito cuando no hay items', () => {
    renderWithRouter(<AuthenticatedNavbar cartItemCount={0} />)
    
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('deberia navegar al carrito cuando se hace click en shopping_cart', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    const cartButton = screen.getByText('shopping_cart').closest('button')
    fireEvent.click(cartButton!)
    
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  it('deberia hacer logout y navegar a home cuando se hace click en logout', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    const logoutButton = screen.getByText('logout')
    fireEvent.click(logoutButton)
    
    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('deberia mostrar cartItemCount correcto en el badge', () => {
    renderWithRouter(<AuthenticatedNavbar cartItemCount={10} />)
    
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('deberia usar valores por defecto para cartItemCount', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    // no debe mostrar badge cuando cartitemCount es 0
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('deberia manejar multiples clicks en botones', () => {
    renderWithRouter(<AuthenticatedNavbar />)
    
    const cartButton = screen.getByText('shopping_cart').closest('button')
    const logoutButton = screen.getByText('logout')
    
    fireEvent.click(cartButton!)
    fireEvent.click(logoutButton)
    fireEvent.click(cartButton!)
    
    expect(mockNavigate).toHaveBeenCalledTimes(3)
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('deberia renderizar la estructura completa del navbar', () => {
    renderWithRouter(<AuthenticatedNavbar cartItemCount={3} />)
    
    // verifica que todos los elementos esten presentes
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('person')).toBeInTheDocument()
    expect(screen.getByText('favorite')).toBeInTheDocument()
    expect(screen.getByText('shopping_cart')).toBeInTheDocument()
    expect(screen.getByText('logout')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})