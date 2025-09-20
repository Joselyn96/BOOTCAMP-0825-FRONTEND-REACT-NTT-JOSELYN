import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero Component', () => {
  it('debería renderizar correctamente el componente', () => {
    render(<Hero />)
    
    // verificar que el componente se renderiza sin errores
    const { container } = render(<Hero />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('deberia mostrar el título principal', () => {
    render(<Hero />)
    
    expect(screen.getByText('Shopping has never been easier')).toBeInTheDocument()
  })

  it('deberia renderizar la estructura completa', () => {
    const { container } = render(<Hero />)
    
    // verificar que se renderiza el contenedor principal
    expect(container.firstChild).toBeInTheDocument()
    
    expect(container.firstChild).toHaveTextContent('Shopping has never been easier')
  })

  it('deberia tener un titulo como elemento de texto', () => {
    render(<Hero />)
    
    const titleElement = screen.getByText('Shopping has never been easier')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.textContent).toBe('Shopping has never been easier')
  })

  it('deberia renderizar sin elementos interactivos', () => {
    const { container } = render(<Hero />)
    
    // verificar que no hay botones enlaces o inputs
    const buttons = container.querySelectorAll('button')
    const links = container.querySelectorAll('a')
    const inputs = container.querySelectorAll('input')
    
    expect(buttons).toHaveLength(0)
    expect(links).toHaveLength(0)
    expect(inputs).toHaveLength(0)
  })

  it('deberia ser un componente estático', () => {
    render(<Hero />)
    
    // verificar que solo contiene texto estatico
    const heroText = screen.getByText('Shopping has never been easier')
    expect(heroText).toBeInTheDocument()
    
    // verificar que el texto es exactamente el esperado
    expect(heroText.textContent).toMatch(/^Shopping has never been easier$/)
  })
})