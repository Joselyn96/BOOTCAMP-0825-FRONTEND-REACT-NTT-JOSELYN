import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from './Login'

const mockOnSubmit = vi.fn()
const mockOnBackToHome = vi.fn()
const mockOnForgotPassword = vi.fn()

const defaultProps = {
  onSubmit: mockOnSubmit,
  onBackToHome: mockOnBackToHome,
  isLoading: false
}

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar todos los elementos principales', () => {
    render(<Login {...defaultProps} />)
    
    expect(screen.getByText('Log in to shop')).toBeInTheDocument()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your_username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('deberia renderizar la imagen con alt text correcto', () => {
    render(<Login {...defaultProps} />)
    
    const image = screen.getByAltText('persona comprando en línea')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/comprando.png')
  })

  it('deberia llamar onBackToHome cuando se hace click en Back to Home', () => {
    render(<Login {...defaultProps} />)
    
    const backButton = screen.getByText('Back to Home')
    fireEvent.click(backButton)
    
    expect(mockOnBackToHome).toHaveBeenCalledTimes(1)
  })

  it('deberia mostrar error cuando se proporciona', () => {
    render(<Login {...defaultProps} error="Invalid credentials" />)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('deberia alternar visibilidad de password', () => {
    render(<Login {...defaultProps} />)
    
    const passwordInput = screen.getByPlaceholderText('Your password')
    const toggleButton = screen.getByText('visibility')
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('deberia mostrar icono correcto segun visibilidad de password', () => {
    render(<Login {...defaultProps} />)
    
    expect(screen.getByText('visibility')).toBeInTheDocument()
    
    const toggleButton = screen.getByText('visibility')
    fireEvent.click(toggleButton)
    
    expect(screen.getByText('visibility_off')).toBeInTheDocument()
  })

  it('deberia validar username requerido', async () => {
    render(<Login {...defaultProps} />)
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
    })
  })

  it('deberia validar longitud minima de username', async () => {
    render(<Login {...defaultProps} />)
    
    const usernameInput = screen.getByPlaceholderText('your_username')
    fireEvent.change(usernameInput, { target: { value: 'ab' } })
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument()
    })
  })

  it('deberia validar password requerido', async () => {
    render(<Login {...defaultProps} />)
    
    const usernameInput = screen.getByPlaceholderText('your_username')
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  it('deberia validar longitud minima de password', async () => {
    render(<Login {...defaultProps} />)
    
    const usernameInput = screen.getByPlaceholderText('your_username')
    const passwordInput = screen.getByPlaceholderText('Your password')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 4 characters')).toBeInTheDocument()
    })
  })

  it('deberia llamar onSubmit con datos correctos cuando el formulario es valido', async () => {
    render(<Login {...defaultProps} />)
    
    const usernameInput = screen.getByPlaceholderText('your_username')
    const passwordInput = screen.getByPlaceholderText('Your password')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      })
    })
  })

  it('deberia deshabilitar boton de submit cuando esta cargando', () => {
    render(<Login {...defaultProps} isLoading={true} />)
    
    const submitButton = screen.getByRole('button', { name: 'Log In' })
    expect(submitButton).toBeDisabled()
  })

  it('deberia mostrar enlace de forgot password como enlace por defecto', () => {
    render(<Login {...defaultProps} />)
    
    const forgotLink = screen.getByText('forgot password?')
    expect(forgotLink).toHaveAttribute('href', '/forgot-password')
  })

  it('deberia usar onForgotPassword callback cuando se proporciona', () => {
    render(<Login {...defaultProps} onForgotPassword={mockOnForgotPassword} />)
    
    const forgotButton = screen.getByText('forgot password?')
    fireEvent.click(forgotButton)
    
    expect(mockOnForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('deberia mostrar enlace de Sign up', () => {
    render(<Login {...defaultProps} />)
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Sign up here')).toBeInTheDocument()
  })

  it('deberia tener labels correctos para los campos', () => {
    render(<Login {...defaultProps} />)
    
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('deberia manejar cambios en los inputs correctamente', () => {
    render(<Login {...defaultProps} />)
    
    const usernameInput = screen.getByPlaceholderText('your_username')
    const passwordInput = screen.getByPlaceholderText('Your password')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    
    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('testpass')
  })
})