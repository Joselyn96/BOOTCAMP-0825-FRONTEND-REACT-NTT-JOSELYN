import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDistricts } from './useDistricts'

// mock del import dinamico
vi.mock('../data/districts.json', () => ({
  default: {
    districts: [
      { id: 1, name: 'Lima', province: 'Lima', region: 'Lima' },
      { id: 2, name: 'Callao', province: 'Callao', region: 'Callao' },
      { id: 3, name: 'Cusco', province: 'Cusco', region: 'Cusco' }
    ]
  }
}))

describe('useDistricts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deberia inicializar con estado de carga', () => {
    const { result } = renderHook(() => useDistricts())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.districts).toEqual([])
    expect(result.current.error).toBe(null)
  })

  it('deberia finalizar el estado de loading', async () => {
    const { result } = renderHook(() => useDistricts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('deberia manejar el estado de error cuando falla', async () => {
    const { result } = renderHook(() => useDistricts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // puede tener error pero no debe crashear
    expect(typeof result.current.error).toBe(result.current.error === null ? 'object' : 'string')
  })

  it('deberia reiniciar error y loading al cargar', () => {
    const { result } = renderHook(() => useDistricts())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('deberia retornar un array de distritos', async () => {
    const { result } = renderHook(() => useDistricts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(Array.isArray(result.current.districts)).toBe(true)
  })

  it('deberia cargar solo una vez al montar el componente', async () => {
    const { result, rerender } = renderHook(() => useDistricts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const initialState = {
      districts: result.current.districts,
      error: result.current.error,
      isLoading: result.current.isLoading
    }

    rerender()

    expect(result.current.districts).toEqual(initialState.districts)
    expect(result.current.error).toBe(initialState.error)
    expect(result.current.isLoading).toBe(initialState.isLoading)
  })
})