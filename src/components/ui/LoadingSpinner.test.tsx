import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('debe renderizar el spinner cuando show es true', () => {
    const { container } = render(
      <LoadingSpinner show={true} />
    )
    
    expect(container.firstChild).not.toBeNull()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('no deberia renderizar nada cuando show es false', () => {
    const { container } = render(
      <LoadingSpinner show={false} />
    )
    
    // verifica que no se renderiza nada
    expect(container.firstChild).toBeNull()
  })

  it('deberia renderizar el componente LoadingOverlay', () => {
    const { container } = render(
      <LoadingSpinner show={true} />
    )
    
    // verifica que existe un elemento LoadingOverlay
    const overlayElement = container.firstChild
    expect(overlayElement).toBeInTheDocument()
  })

  it('deberia renderizar el componente Spinner dentro del overlay', () => {
    const { container } = render(
      <LoadingSpinner show={true} />
    )
    
    // verifica que tiene estructura anidada overlay con el spinner dentro
    const overlayElement = container.firstChild as HTMLElement
    expect(overlayElement.children.length).toBeGreaterThan(0)
  })

  it('deberia retornar null cuando show es false', () => {
    const { container } = render(
      <LoadingSpinner show={false} />
    )
    
    // confirma que el return null funciona bien
    expect(container.innerHTML).toBe('')
  })
})