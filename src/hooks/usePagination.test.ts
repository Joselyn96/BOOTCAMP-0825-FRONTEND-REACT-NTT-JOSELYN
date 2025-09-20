import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import usePagination from './usepagination'

describe('usePagination Hook', () => {
  it('deberia inicializar con valores por defecto correctos', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(10)
    expect(result.current.visiblePages).toEqual([1, 2, 3])
    expect(result.current.hasPrevGroup).toBe(false)
    expect(result.current.hasNextGroup).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(result.current.skip).toBe(0)
  })

  it('deberia calcular el total de paginas de manera correcta', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 25, itemsPerPage: 10 })
    )

    expect(result.current.totalPages).toBe(3)
  })

  it('deberia usar groupSize personalizado', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10, groupSize: 5 })
    )

    expect(result.current.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('deberia navegar a pagina especifica de manera correcta', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.goToPage(5)
    })

    expect(result.current.currentPage).toBe(5)
    expect(result.current.skip).toBe(40) // (5-1) * 10
    expect(result.current.visiblePages).toEqual([4, 5, 6])
  })

  it('no deberia navegar a pagina invalida', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.goToPage(0)
    })

    expect(result.current.currentPage).toBe(1)

    act(() => {
      result.current.goToPage(15)
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('no deberia cambiar si intenta ir a la pagina actual', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.goToPage(1)
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('deberia navegar al grupo anterior correctamente', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.goToPage(5)
    })

    expect(result.current.visiblePages).toEqual([4, 5, 6])
    expect(result.current.hasPrevGroup).toBe(true)

    act(() => {
      result.current.goToPrevGroup()
    })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.visiblePages).toEqual([1, 2, 3])
  })

  it('no deberia ir al anterior si no existe', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.goToPrevGroup()
    })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.visiblePages).toEqual([1, 2, 3])
  })

  it('deberia navegar al grupo siguiente correctamente', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    expect(result.current.hasNextGroup).toBe(true)

    act(() => {
      result.current.goToNextGroup()
    })

    expect(result.current.currentPage).toBe(4)
    expect(result.current.visiblePages).toEqual([4, 5, 6])
  })

  it('no deberia ir al grupo siguiente si no existe', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 30, itemsPerPage: 10 })
    )

    expect(result.current.totalPages).toBe(3)
    expect(result.current.hasNextGroup).toBe(false)

    act(() => {
      result.current.goToNextGroup()
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('deberia manejar loading state correctamente', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.loading).toBe(true)

    act(() => {
      result.current.setLoading(false)
    })

    expect(result.current.loading).toBe(false)
  })

  it('debe resetear al estado inicial', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 10 })
    )

    // cambia estado
    act(() => {
      result.current.goToPage(5)
      result.current.setLoading(true)
    })

    expect(result.current.currentPage).toBe(5)
    expect(result.current.loading).toBe(true)

    // resetear
    act(() => {
      result.current.reset()
    })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.loading).toBe(false)
  })

  it('deberia calcular skip correctamente para diferentes paginas', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 100, itemsPerPage: 5 })
    )

    expect(result.current.skip).toBe(0)

    act(() => {
      result.current.goToPage(3)
    })

    expect(result.current.skip).toBe(10)
  })

  it('deberia manejar casos extremos con pocos elementos', () => {
    const { result } = renderHook(() => 
      usePagination({ totalItems: 5, itemsPerPage: 10 })
    )

    expect(result.current.totalPages).toBe(1)
    expect(result.current.visiblePages).toEqual([1])
    expect(result.current.hasPrevGroup).toBe(false)
    expect(result.current.hasNextGroup).toBe(false)
  })

  it('deberia actualizar correctamente cuando cambian props', () => {
    const { result, rerender } = renderHook(
      (props) => usePagination(props),
      { initialProps: { totalItems: 50, itemsPerPage: 10 } }
    )

    expect(result.current.totalPages).toBe(5)

    // cambiar props
    rerender({ totalItems: 100, itemsPerPage: 10 })

    expect(result.current.totalPages).toBe(10)
  })
})