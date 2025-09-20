import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Newsletter from './Newsletter'

// mock console.log para testear el comportamiento del submit
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Newsletter Component', () => {
  afterEach(() => {
    mockConsoleLog.mockClear()
  })

  it('deberia renderizar todos los textos correctamente', () => {
    render(<Newsletter />)
    
    expect(screen.getByText('Stay home and buy what you need in our store')).toBeInTheDocument()
    expect(screen.getByText('Start Your Daily Shopping with Nest Mart')).toBeInTheDocument()
  })

  it('deberia renderizar el formulario con input y boton', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    const submitButton = screen.getByText('Subscribe')
    
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('deberia permitir escribir en el campo de email', async () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('deberia limpiar el input después del submit', async () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    const submitButton = screen.getByText('Subscribe')
    
    // escribir email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput).toHaveValue('test@example.com')
    
    // submit formulario
    fireEvent.click(submitButton)
    
    // verificar que se limpio
    await waitFor(() => {
      expect(emailInput).toHaveValue('')
    })
  })

  it('deberia llamar console.log con el email correcto al hacer submit', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    const submitButton = screen.getByText('Subscribe')
    
    // escribir email y submit
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.click(submitButton)
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Email submitted:', 'user@test.com')
  })

  it('deberia tener el input con type="email" y required', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
  })

  it('deberia renderizar las dos imágenes con alt text correcto', () => {
    render(<Newsletter />)
    
    const productImage = screen.getByAltText('grocery products')
    const personImage = screen.getByAltText('person')
    
    expect(productImage).toBeInTheDocument()
    expect(personImage).toBeInTheDocument()
    
    expect(productImage).toHaveAttribute('src', '/productos.png')
    expect(personImage).toHaveAttribute('src', '/persona.png')
  })

  it('deberia manejar submit con input vacío', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    // asegurar que input esta vacio
    expect(emailInput).toHaveValue('')
    
    // submit con form submit event
    const form = emailInput.closest('form')!
    fireEvent.submit(form)
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Email submitted:', '')
  })

  it('deberia mantener estado inicial del input como string vacío', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    expect(emailInput).toHaveValue('')
  })

  it('deberia actualizar estado cuando se cambia el input', () => {
    render(<Newsletter />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    // cambios multiples
    fireEvent.change(emailInput, { target: { value: 'a' } })
    expect(emailInput).toHaveValue('a')
    
    fireEvent.change(emailInput, { target: { value: 'ab' } })
    expect(emailInput).toHaveValue('ab')
    
    fireEvent.change(emailInput, { target: { value: 'abc@test.com' } })
    expect(emailInput).toHaveValue('abc@test.com')
  })
})