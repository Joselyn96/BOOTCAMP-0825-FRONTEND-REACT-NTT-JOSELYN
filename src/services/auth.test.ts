import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authService } from './authService';

// mck global fetch
const mockFetch = vi.fn()
;(globalThis as any).fetch = mockFetch

// mock console
const mockConsole = vi.spyOn(console, 'log').mockImplementation(() => {})

// mock setTimeout
vi.useFakeTimers()

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('login', () => {
    it('debe hacer login exitosamente', async () => {
      const mockResponse = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        image: 'test.jpg',
        accessToken: 'access-token-123',
        refreshToken: 'refresh-token-456'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const credentials = {
        username: 'testuser',
        password: 'testpass'
      }

      const result = await authService.login(credentials)

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      expect(result).toEqual(mockResponse)
      expect(mockConsole).toHaveBeenCalledWith('Raw API response:', mockResponse)
      expect(mockConsole).toHaveBeenCalledWith('Mapped response:', mockResponse)
    })

    it('debe manejar respuesta de error del servidor', async () => {
      const errorMessage = 'Invalid credentials'
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage })
      })

      const credentials = {
        username: 'wronguser',
        password: 'wrongpass'
      }

      await expect(authService.login(credentials)).rejects.toThrow(errorMessage)
    })

    it('debe manejar error sin mensaje especifico', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({})
      })

      const credentials = {
        username: 'testuser',
        password: 'testpass'
      }

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')
    })

    it('debe mapear correctamente la respuesta', async () => {
      const rawResponse = {
        id: 2,
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        image: 'john.jpg',
        accessToken: 'token-abc',
        refreshToken: 'refresh-xyz'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => rawResponse
      })

      const credentials = {
        username: 'john_doe',
        password: 'password123'
      }

      const result = await authService.login(credentials)

      expect(result).toEqual({
        id: 2,
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        image: 'john.jpg',
        accessToken: 'token-abc',
        refreshToken: 'refresh-xyz'
      })
    })

    it('debe enviar las credenciales correctas en el body', async () => {
      const mockResponse = {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        image: 'test.jpg',
        accessToken: 'token',
        refreshToken: 'refresh'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const credentials = {
        username: 'myusername',
        password: 'mypassword'
      }

      await authService.login(credentials)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        })
      )
    })

    it('debe manejar errores de red', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const credentials = {
        username: 'testuser',
        password: 'testpass'
      }

      await expect(authService.login(credentials)).rejects.toThrow('Network error')
    })
  })

  describe('requestPasswordReset', () => {
    it('debe enviar reset exitosamente con email valido', async () => {
      const email = 'test@example.com'

      const promise = authService.requestPasswordReset(email)

      // avanzar timers para simular el delay
      vi.advanceTimersByTime(1500)

      const result = await promise

      expect(result).toEqual({
        success: true,
        message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
      })
    })

    it('debe rechazar email invalido sin @', async () => {
      const invalidEmail = 'invalid-email'

      await expect(authService.requestPasswordReset(invalidEmail))
        .rejects.toThrow('Por favor ingresa un email válido')
    })

    it('debe rechazar email invalido sin dominio', async () => {
      const invalidEmail = 'test@'

      await expect(authService.requestPasswordReset(invalidEmail))
        .rejects.toThrow('Por favor ingresa un email válido')
    })

    it('debe rechazar email invalido sin extension', async () => {
      const invalidEmail = 'test@domain'

      await expect(authService.requestPasswordReset(invalidEmail))
        .rejects.toThrow('Por favor ingresa un email válido')
    })

    it('debe rechazar email con espacios', async () => {
      const invalidEmail = 'test @example.com'

      await expect(authService.requestPasswordReset(invalidEmail))
        .rejects.toThrow('Por favor ingresa un email válido')
    })

    it('debe aceptar email valido con subdominios', async () => {
      const email = 'test@mail.example.com'

      const promise = authService.requestPasswordReset(email)
      vi.advanceTimersByTime(1500)

      const result = await promise

      expect(result.success).toBe(true)
    })

    it('debe aceptar email valido con guiones', async () => {
      const email = 'test-user@example-domain.com'

      const promise = authService.requestPasswordReset(email)
      vi.advanceTimersByTime(1500)

      const result = await promise

      expect(result.success).toBe(true)
    })

    it('debe simular delay correctamente', async () => {
      const email = 'test@example.com'

      const promise = authService.requestPasswordReset(email)
      vi.advanceTimersByTime(1500)

      const result = await promise
      expect(result.success).toBe(true)
    })

    it('debe validar email vacio', async () => {
      const email = ''

      await expect(authService.requestPasswordReset(email))
        .rejects.toThrow('Por favor ingresa un email válido')
    })

    it('debe retornar el mensaje correcto', async () => {
      const email = 'user@domain.com'

      const promise = authService.requestPasswordReset(email)
      vi.advanceTimersByTime(1500)

      const result = await promise

      expect(result.message).toBe('Si el email existe en nuestro sistema, recibirás un enlace de recuperación')
      expect(result.success).toBe(true)
    })
  })
})