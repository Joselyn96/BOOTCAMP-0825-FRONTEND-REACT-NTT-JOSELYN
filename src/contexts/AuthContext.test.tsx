import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'

// mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

// componente test
const TestComponent = () => {
  const auth = useAuth()
  
  return (
    <div>
      <div data-testid="user">{auth.user?.username || 'null'}</div>
      <div data-testid="authenticated">{auth.isAuthenticated.toString()}</div>
      <button 
        onClick={() => auth.login(
          { id: 1, username: 'test', firstName: 'Test', lastName: 'User', email: 'test@test.com', image: 'test.jpg' },
          'token', 'refresh'
        )}
        data-testid="login"
      >
        Login
      </button>
      <button onClick={auth.logout} data-testid="logout">Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  it('debe renderizar estado inicial', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user')).toHaveTextContent('null')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
  })

  it('debe hacer login', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    act(() => {
      screen.getByTestId('login').click()
    })

    expect(screen.getByTestId('user')).toHaveTextContent('test')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
  })

  it('debe hacer logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Login
    act(() => {
      screen.getByTestId('login').click()
    })

    // logout
    act(() => {
      screen.getByTestId('logout').click()
    })

    expect(screen.getByTestId('user')).toHaveTextContent('null')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
  })

  it('debe guardar en localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    act(() => {
      screen.getByTestId('login').click()
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('accessToken', 'token')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh')
  })

  it('debe limpiar localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    act(() => {
      screen.getByTestId('login').click()
    })

    act(() => {
      screen.getByTestId('logout').click()
    })

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('accessToken')
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('refreshToken')
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userData')
  })

  it('debe lanzar error sin provider', () => {
    const TestWithoutProvider = () => {
      useAuth()
      return <div>test</div>
    }

    expect(() => render(<TestWithoutProvider />)).toThrow()
  })
})