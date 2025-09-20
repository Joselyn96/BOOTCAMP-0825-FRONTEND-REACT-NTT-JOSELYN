import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Alert from './Alert'

describe('Alert Component', () => {
  it('debe mostrar una alerta cuando show sea truee', () => {
    render(
      <Alert 
        show={true} 
        type="success" 
        message="Operation successful" 
      />
    )
    
    expect(screen.getByText('Operation successful')).toBeInTheDocument()
  })

  it('No debe mostrar una alerta cuando show es false', () => {
    render(
      <Alert 
        show={false} 
        type="success" 
        message="This should not appear" 
      />
    )
    
    expect(screen.queryByText('This should not appear')).not.toBeInTheDocument()
  })

  it('debería mostrar una alerta exitosa con el mensaje correcto', () => {
    render(
      <Alert 
        show={true} 
        type="success" 
        message="Success message" 
      />
    )
    
    expect(screen.getByText('Success message')).toBeInTheDocument()
  })

  it('debe mostrar una alerta de advertencia con el mensaje correcto', () => {
    render(
      <Alert 
        show={true} 
        type="warning" 
        message="Warning message" 
      />
    )
    
    expect(screen.getByText('Warning message')).toBeInTheDocument()
  })

  it('debe mostrar un documento vacio cuando show es false', () => {
    const { container } = render(
      <Alert 
        show={false} 
        type="success" 
        message="Hidden message" 
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('debe gestionar cadenas vacias', () => {
    const { container } = render(
      <Alert 
        show={true} 
        type="success" 
        message="" 
      />
    )
    expect(container.firstChild).not.toBeNull()
    expect(container.querySelector('[type="success"]')).toBeInTheDocument()
  })
})