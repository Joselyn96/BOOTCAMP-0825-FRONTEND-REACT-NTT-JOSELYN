import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Benefits from './Benefits'

describe('Benefits Component', () => {
  it('deberia renderizar correctamente', () => {
    render(<Benefits />)
    
    // verifica titulos principales
    expect(screen.getByText('FAST')).toBeInTheDocument()
    expect(screen.getByText('SECURE')).toBeInTheDocument()
    expect(screen.getByText('CUSTOMER')).toBeInTheDocument()
    expect(screen.getByText('EASY')).toBeInTheDocument()
  })

  it('deberia mostrar los subtitulos correctamente', () => {
    render(<Benefits />)
    
    // verifica subtitulos
    expect(screen.getByText('DELIVERY')).toBeInTheDocument()
    expect(screen.getByText('SHOPPING')).toBeInTheDocument()
    expect(screen.getByText('SUPPORT')).toBeInTheDocument()
    expect(screen.getByText('RETURNS')).toBeInTheDocument()
  })

  it('deberia mostrar los iconos correctos', () => {
    render(<Benefits />)
    
    // verifica iconos por su texto
    expect(screen.getByText('delivery_truck_bolt')).toBeInTheDocument()
    expect(screen.getByText('shield_locked')).toBeInTheDocument()
    expect(screen.getByText('support_agent')).toBeInTheDocument()
    expect(screen.getByText('nest_clock_farsight_analog')).toBeInTheDocument()
  })

  it('deberia renderizar exactamente 4 beneficios', () => {
    const { container } = render(<Benefits />)
    
    // contar elementos con iconos
    const icons = container.querySelectorAll('.material-symbols-outlined')
    expect(icons).toHaveLength(4)
  })

  it('deberia combinar titulo y subtitulo correctamente para cada beneficio', () => {
    render(<Benefits />)
    
    // vVerifica combinaciones específicas
    const container = screen.getByText('FAST').closest('div')
    expect(container?.textContent).toContain('DELIVERY')
    
    const secureContainer = screen.getByText('SECURE').closest('div')
    expect(secureContainer?.textContent).toContain('SHOPPING')
  })

  it('deberia usar la clase csss para iconos', () => {
    const { container } = render(<Benefits />)
    
    // verifica que todos los iconos tienen la clase correcta
    const iconsWithClass = container.querySelectorAll('.material-symbols-outlined')
    expect(iconsWithClass.length).toBe(4)
    
    // verifica que cada icono tiene contenido
    iconsWithClass.forEach(icon => {
      expect(icon.textContent).toBeTruthy()
    })
  })
})