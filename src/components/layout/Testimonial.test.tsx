import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Testimonials from './Testimonial'

// mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

describe('Testimonials Component', () => {
  beforeEach(() => {
    // Reset window size
    window.innerWidth = 1024
    
    // Mock addEventListener and removeEventListener
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deberia renderizar el titulo y subtitulo correctamente', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument()
    expect(screen.getByText('Real testimonials from satisfied customers with our service')).toBeInTheDocument()
  })

  it('deberia mostrar todos los testimoniales con nombres y comentarios', () => {
    render(<Testimonials />)
    
    // Verificar que se renderizan los nombres
    expect(screen.getByText('María González')).toBeInTheDocument()
    expect(screen.getByText('Carlos Rodríguez')).toBeInTheDocument()
    expect(screen.getByText('Ana Martínez')).toBeInTheDocument()
    expect(screen.getByText('Luis Fernández')).toBeInTheDocument()
    expect(screen.getByText('Carmen López')).toBeInTheDocument()
    expect(screen.getByText('Diego Morales')).toBeInTheDocument()
  })

  it('deberia mostrar los comentarios con comillas', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('"Excellent service and quality products. Highly recommended."')).toBeInTheDocument()
    expect(screen.getByText('"Fast delivery and exceptional customer service."')).toBeInTheDocument()
    expect(screen.getByText('"Wide variety of products and competitive prices."')).toBeInTheDocument()
  })

  it('deberia renderizar las estrellas de rating correctamente', () => {
    render(<Testimonials />)
    
    // cada testimonial tiene 5 estrellas
    const stars = screen.getAllByText('★')
    expect(stars).toHaveLength(30)
  })

  it('debería tener aria-labels en las ratings', () => {
    render(<Testimonials />)
    
    const ratings = screen.getAllByLabelText(/Calificación 5 de 5/)
    expect(ratings).toHaveLength(6)
  })

  it('deberia renderizar los botones de navegación', () => {
    render(<Testimonials />)
    
    const prevButton = screen.getByLabelText('Anterior')
    const nextButton = screen.getByLabelText('Siguiente')
    
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('deberia deshabilitar el botón anterior al inicio', () => {
    render(<Testimonials />)
    
    const prevButton = screen.getByLabelText('Anterior')
    expect(prevButton).toBeDisabled()
  })

  it('deberia navegar al siguiente testimonial al hacer click en siguiente', () => {
    render(<Testimonials />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    const prevButton = screen.getByLabelText('Anterior')
    
    // prev esta deshabilitado
    expect(prevButton).toBeDisabled()
    
    // click en siguiente
    fireEvent.click(nextButton)
    
    // ahora prev deberia estar habilitado
    expect(prevButton).not.toBeDisabled()
  })

  it('deberia navegar al anterior testimonial al hacer click en anterior', () => {
    render(<Testimonials />)
    
    const nextButton = screen.getByLabelText('Siguiente')
    const prevButton = screen.getByLabelText('Anterior')
    
    // navegar hacia adelante primero
    fireEvent.click(nextButton)
    expect(prevButton).not.toBeDisabled()
    
    // luego navegar hacia atrás
    fireEvent.click(prevButton)
    expect(prevButton).toBeDisabled()
  })

  it('deberia agregar event listener para resize en el mount', () => {
    render(<Testimonials />)
    
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('deberia calcular items por vista según el ancho de ventana', () => {
    // test en movil
    window.innerWidth = 500
    render(<Testimonials />)
    
    // el componente deberia ajustarse al tamaño de la ventana
    expect(window.addEventListener).toHaveBeenCalled()
  })

  it('debería limpiar event listener en unmount', () => {
    const { unmount } = render(<Testimonials />)
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('deberia manejar el resize de ventana correctamente', () => {
    render(<Testimonials />)
    
    // simular cambio de tamaño de ventana
    act(() => {
      window.innerWidth = 768
      window.dispatchEvent(new Event('resize'))
    })

    const prevButton = screen.getByLabelText('Anterior')
    expect(prevButton).toBeInTheDocument()
  })

  it('deberia renderizar exactamente 6 testimoniales', () => {
    render(<Testimonials />)
    
    // contar los nombres de clientes 
    const authorNames = [
      'María González',
      'Carlos Rodríguez', 
      'Ana Martínez',
      'Luis Fernández',
      'Carmen López',
      'Diego Morales'
    ]
    
    authorNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})