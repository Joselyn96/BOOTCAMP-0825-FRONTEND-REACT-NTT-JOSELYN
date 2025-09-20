import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

// wrapper para react router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  const mockOnToggleSidebar = vi.fn()

  beforeEach(() => {
    mockOnToggleSidebar.mockClear()
  })

  it('deberia renderizar el logo correctamente', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
  })

  it('deberia renderizar todos los enlaces de navegacion', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('deberia renderizar el boton de login con enlace correcto', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const loginButton = screen.getByText('Login')
    expect(loginButton).toBeInTheDocument()
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login')
  })

  it('deberia renderizar el boton de menú hamburguesa', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const menuButton = screen.getByText('☰')
    expect(menuButton).toBeInTheDocument()
  })

  it('deberria llamar onToggleSidebar cuando se hace click en el mennu', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const menuButton = screen.getByText('☰')
    fireEvent.click(menuButton)
    
    expect(mockOnToggleSidebar).toHaveBeenCalledTimes(1)
  })

  it('deberi renderizar correctamente cuando isscrolled es true', () => {
    renderWithRouter(<Navbar isScrolled={true} onToggleSidebar={mockOnToggleSidebar} />)
    
    // componente debe renderizarse sin errores con isScrolled=true
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('deberia renderizar correctamente cuando isscrolled es false', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    // El componente debería renderizarse sin errores con isScrolled=false
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('deberia tener los enlaces con href="#"', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const homeLink = screen.getByText('Home')
    const aboutLink = screen.getByText('About')
    const contactLink = screen.getByText('Contact')
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '#')
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#')
    expect(contactLink.closest('a')).toHaveAttribute('href', '#')
  })

  it('deberia tener la estructura de layout correcta', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    // verificar que todos los elementos principales estan presentes
    expect(screen.getByText('☰')).toBeInTheDocument()
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('deberia manejar multiples clicks en el menu', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const menuButton = screen.getByText('☰')
    
    fireEvent.click(menuButton)
    fireEvent.click(menuButton)
    fireEvent.click(menuButton)
    
    expect(mockOnToggleSidebar).toHaveBeenCalledTimes(3)
  })

  it('deberia renderizar el NavLink correctamente para login', () => {
    renderWithRouter(<Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />)
    
    const loginLink = screen.getByText('Login')
    
    // verifica que es un NavLink
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
  })

  it('deberia pasar las props isscrolled correctamente a los elementos styled', () => {
    // test con isScrolled = true
    const { rerender } = renderWithRouter(<Navbar isScrolled={true} onToggleSidebar={mockOnToggleSidebar} />)
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    
    // test con isScrolled = false
    rerender(
      <BrowserRouter>
        <Navbar isScrolled={false} onToggleSidebar={mockOnToggleSidebar} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
  })
})