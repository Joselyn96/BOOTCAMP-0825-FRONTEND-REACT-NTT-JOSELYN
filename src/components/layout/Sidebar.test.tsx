import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

const mockOnClose = vi.fn()

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar el titulo correctamente', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
  })

  it('deberia renderizar todos los enlaces de navegacion', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('deberia mostrar el boton de cerrar con icono', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('deberia llamar onClose cuando se hace click en el boton de cerrar', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('deberiia llamar onClose cuando se hace click en Home', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const homeLink = screen.getByText('Home')
    fireEvent.click(homeLink)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('deberia llamar onClose cuando se hace click en About', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const aboutLink = screen.getByText('About')
    fireEvent.click(aboutLink)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('deberia llamar onClose cuando se hace click en Contact', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const contactLink = screen.getByText('Contact')
    fireEvent.click(contactLink)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('deberia tener el boton Login como enlace a /login', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const loginLink = screen.getByRole('link', { name: 'Login' })
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('deberia renderizar correctamente cuando esta cerrado', () => {
    renderWithRouter(<Sidebar isOpen={false} onClose={mockOnClose} />)
    
    // componente se renderiza pero podria estar oculto en CSS
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
  })

  it('deberia renderizar correctamente cuando esta abierto', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('deberia tener enlaces con href correcto para navegacion', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const homeLink = screen.getByText('Home').closest('a')
    const aboutLink = screen.getByText('About').closest('a')
    const contactLink = screen.getByText('Contact').closest('a')
    
    expect(homeLink).toHaveAttribute('href', '#')
    expect(aboutLink).toHaveAttribute('href', '#')
    expect(contactLink).toHaveAttribute('href', '#')
  })

  it('deberia manejar multiples clicks en el boton de cerrar', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(3)
  })

  it('deberia renderizar la estructura completa del sidebar', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    // verifica que todos los elementos esten presentes
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('✕')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('deberia no llamar onClose cuando se hace click en Login', () => {
    renderWithRouter(<Sidebar isOpen={true} onClose={mockOnClose} />)
    
    const loginLink = screen.getByText('Login')
    fireEvent.click(loginLink)
    
    // login no deberia cerrar el sidebar 
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})