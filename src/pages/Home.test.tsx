import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from './Home'

// Mock del hook useScroll
vi.mock('../hooks/useScroll', () => ({
  useScroll: vi.fn(() => false)
}))

// mock de todos los componentes
vi.mock('../components/layout/Navbar', () => ({
  default: ({ isScrolled, onToggleSidebar }: any) => (
    <nav data-testid="navbar" data-scrolled={isScrolled}>
      <button onClick={onToggleSidebar} data-testid="toggle-sidebar">
        Toggle Sidebar
      </button>
    </nav>
  )
}))

vi.mock('../components/layout/Sidebar', () => ({
  default: ({ isOpen, onClose }: any) => (
    <aside 
      data-testid="sidebar" 
      data-open={isOpen}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <button onClick={onClose} data-testid="close-sidebar">
        Close
      </button>
    </aside>
  )
}))

vi.mock('../components/layout/Hero', () => ({
  default: () => <section data-testid="hero">Hero Component</section>
}))

vi.mock('../components/layout/Benefits', () => ({
  default: () => <section data-testid="benefits">Benefits Component</section>
}))

vi.mock('../components/layout/Categories', () => ({
  default: () => <section data-testid="categories">Categories Component</section>
}))

vi.mock('../components/layout/Carousel', () => ({
  default: () => <section data-testid="carousel">Carousel Component</section>
}))

vi.mock('../components/layout/Newsletter', () => ({
  default: () => <section data-testid="newsletter">Newsletter Component</section>
}))

vi.mock('../components/layout/Testimonial', () => ({
  default: () => <section data-testid="testimonial">Testimonial Component</section>
}))

vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer Component</footer>
}))

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe renderizar sin errores', () => {
    render(<Home />)
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('benefits')).toBeInTheDocument()
    expect(screen.getByTestId('categories')).toBeInTheDocument()
    expect(screen.getByTestId('carousel')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter')).toBeInTheDocument()
    expect(screen.getByTestId('testimonial')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('debe inicializar sidebar como cerrado', () => {
    render(<Home />)
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveAttribute('data-open', 'false')
    expect(sidebar).toHaveStyle({ display: 'none' })
  })

  it('debe abrir sidebar al hacer click en toggle', () => {
    render(<Home />)
    
    const toggleButton = screen.getByTestId('toggle-sidebar')
    fireEvent.click(toggleButton)
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveAttribute('data-open', 'true')
    expect(sidebar).toHaveStyle({ display: 'block' })
  })

  it('debe cerrar sidebar al hacer click en close', () => {
    render(<Home />)
    
    // abrir sidebar primero
    const toggleButton = screen.getByTestId('toggle-sidebar')
    fireEvent.click(toggleButton)
    
    // crrar sidebar
    const closeButton = screen.getByTestId('close-sidebar')
    fireEvent.click(closeButton)
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveAttribute('data-open', 'false')
    expect(sidebar).toHaveStyle({ display: 'none' })
  })

  it('debe renderizar overlay cuando sidebar esta abierto', () => {
    render(<Home />)
    
    // abrir sidebar
    const toggleButton = screen.getByTestId('toggle-sidebar')
    fireEvent.click(toggleButton)
    
    const overlay = document.querySelector('.sidebar-overlay')
    expect(overlay).toBeInTheDocument()
  })

  it('debe cerrar sidebar al hacer click en overlay', () => {
    render(<Home />)
    
    // abrir sidebar
    const toggleButton = screen.getByTestId('toggle-sidebar')
    fireEvent.click(toggleButton)
    
    // click en overlay
    const overlay = document.querySelector('.sidebar-overlay')
    fireEvent.click(overlay!)
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveAttribute('data-open', 'false')
  })

  it('no debe renderizar overlay cuando sidebar esta cerrado', () => {
    render(<Home />)
    
    const overlay = document.querySelector('.sidebar-overlay')
    expect(overlay).not.toBeInTheDocument()
  })

  it('debe poder abrir y cerrar sidebar multiples veces', () => {
    render(<Home />)
    
    const toggleButton = screen.getByTestId('toggle-sidebar')
    const sidebar = screen.getByTestId('sidebar')
    
    // abrir
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-open', 'true')
    
    // cerrar
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-open', 'false')
    
    // abrir otra vez
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-open', 'true')
  })

  it('debe tener clase min-h-screen en container principal', () => {
    const { container } = render(<Home />)
    
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('min-h-screen')
  })

  it('debe renderizar todos los componentes principales', () => {
    render(<Home />)
    
    // verificar que cada componente principal existe
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('benefits')).toBeInTheDocument()
    expect(screen.getByTestId('categories')).toBeInTheDocument()
    expect(screen.getByTestId('carousel')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter')).toBeInTheDocument()
    expect(screen.getByTestId('testimonial')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('debe manejar estado de sidebar independientemente', () => {
    render(<Home />)
    
    const toggleButton = screen.getByTestId('toggle-sidebar')
    const closeButton = screen.getByTestId('close-sidebar')
    const sidebar = screen.getByTestId('sidebar')
    
    // estado inicial cerrado
    expect(sidebar).toHaveAttribute('data-open', 'false')
    
    // abrir con toggle
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-open', 'true')
    
    // cerrar con close button
    fireEvent.click(closeButton)
    expect(sidebar).toHaveAttribute('data-open', 'false')
    
    // abrir otra vez con toggle
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-open', 'true')
  })

  it('debe renderizar estructura completa de la pagina', () => {
    render(<Home />)
    
    // verificar que todos los componentes principales esten presentes
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument() 
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('benefits')).toBeInTheDocument()
    expect(screen.getByTestId('categories')).toBeInTheDocument()
    expect(screen.getByTestId('carousel')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter')).toBeInTheDocument()
    expect(screen.getByTestId('testimonial')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    
    // verificar estructura del DOM
    const mainContainer = document.querySelector('.min-h-screen')
    expect(mainContainer).toBeInTheDocument()
  })
})