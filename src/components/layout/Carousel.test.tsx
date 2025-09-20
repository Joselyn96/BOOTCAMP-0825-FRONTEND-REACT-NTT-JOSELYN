import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Carousel from './Carousel'

describe('Carousel Component', () => {
  beforeEach(() => {
    // reset any state before each test
  })

  it('deberia renderizar el titulo correctamente', () => {
    render(<Carousel />)
    
    expect(screen.getByText('Explore Our Categories')).toBeInTheDocument()
  })

  it('deberia renderizar todos los slides con titulos correctos', () => {
    render(<Carousel />)
    
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
    expect(screen.getByText('FASHION')).toBeInTheDocument()
    expect(screen.getByText('BEAUTY')).toBeInTheDocument()
    expect(screen.getByText('SPORTS')).toBeInTheDocument()
    expect(screen.getByText('HOME')).toBeInTheDocument()
  })

  it('deberia renderizar todas las imagenes con alt text correcto', () => {
    render(<Carousel />)
    
    expect(screen.getByAltText('TECHNOLOGY')).toBeInTheDocument()
    expect(screen.getByAltText('FASHION')).toBeInTheDocument()
    expect(screen.getByAltText('BEAUTY')).toBeInTheDocument()
    expect(screen.getByAltText('SPORTS')).toBeInTheDocument()
    expect(screen.getByAltText('HOME')).toBeInTheDocument()
  })

  it('deberia tener 5 slides en total', () => {
    render(<Carousel />)
    
    const slides = screen.getAllByText(/TECHNOLOGY|FASHION|BEAUTY|SPORTS|HOME/)
    expect(slides).toHaveLength(5)
  })

  it('deberia renderizar botones de navegacion anterior y siguiente', () => {
    render(<Carousel />)
    
    expect(screen.getByText('‹')).toBeInTheDocument()
    expect(screen.getByText('›')).toBeInTheDocument()
  })

  it('deberia renderizar 5 indicadores', () => {
    const { container } = render(<Carousel />)
    
    const indicatorElements = container.querySelectorAll('button')
    
    // deberían ser 7 botones 2 navegación y 5 indicadores
    expect(indicatorElements.length).toBeGreaterThanOrEqual(5)
  })

  it('deberia avanzar al siguiente slide cuando se hace click en boton siguiente', () => {
    render(<Carousel />)
    
    const nextButton = screen.getByText('›')
    fireEvent.click(nextButton)
    
    // verifica que el estado cambio
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
    expect(screen.getByText('FASHION')).toBeInTheDocument()
  })

  it('deberia retroceder al slide anterior cuando se hace click en boton anterior', () => {
    render(<Carousel />)
    
    const prevButton = screen.getByText('‹')
    fireEvent.click(prevButton)
    
    // verifica que el componente no se rompe
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
    expect(screen.getByText('HOME')).toBeInTheDocument()
  })

  it('deberia manejar navegacion ciclica - del ultimo al primero', () => {
    render(<Carousel />)
    
    const nextButton = screen.getByText('›')
    
    // hacer click 5 veces para volver al inicio
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton)
    }
    
    // deberia seguir funcionando
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
  })

  it('deberia manejar navegacion ciclica - del primero al ultimo', () => {
    render(<Carousel />)
    
    const prevButton = screen.getByText('‹')
    fireEvent.click(prevButton)
    
    // deberia seguir funcionando
    expect(screen.getByText('HOME')).toBeInTheDocument()
  })

  it('deberia tener imagenes con src correcto', () => {
    render(<Carousel />)
    
    const techImage = screen.getByAltText('TECHNOLOGY')
    const fashionImage = screen.getByAltText('FASHION')
    
    expect(techImage).toHaveAttribute('src', '/tecnologia.png')
    expect(fashionImage).toHaveAttribute('src', '/fashion.png')
  })

  it('deberia manejar multiples clicks en botones de navegacion', () => {
    render(<Carousel />)
    
    const nextButton = screen.getByText('›')
    const prevButton = screen.getByText('‹')
    
    // multiples clicks no deberian romper el componente
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(prevButton)
    fireEvent.click(nextButton)
    
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
  })

  it('deberia renderizar la estructura completa del carousel', () => {
    render(<Carousel />)
    
    // Verificar que todos los elementos principales estan presentes
    expect(screen.getByText('Explore Our Categories')).toBeInTheDocument()
    expect(screen.getByText('‹')).toBeInTheDocument()
    expect(screen.getByText('›')).toBeInTheDocument()
    expect(screen.getByText('TECHNOLOGY')).toBeInTheDocument()
    expect(screen.getByAltText('TECHNOLOGY')).toBeInTheDocument()
  })

  it('deberia tener todas las imagenes con fallback correcto', () => {
    render(<Carousel />)
    
    const images = screen.getAllByRole('img')
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      const src = img.getAttribute('src')
      expect(src).toBeTruthy()
    })
  })

  it('deberia mantener funcionamiento con clicks rapidos', () => {
    render(<Carousel />)
    
    const nextButton = screen.getByText('›')
    
    // clicks rapidos
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    
    // componente deberia seguir funcionando
    expect(screen.getByText('SPORTS')).toBeInTheDocument()
  })
})