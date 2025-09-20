import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScroll } from './useScroll'

describe('useScroll Hook', () => {
  // mock window.scrollY
  const mockScrollY = vi.fn()
  
  beforeEach(() => {
    // mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      get: mockScrollY,
      configurable: true
    })
    
    // mock addEventListener y removeEventListener
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('debe retornar false al inicio', () => {
    mockScrollY.mockReturnValue(0)
    
    const { result } = renderHook(() => useScroll(50))
    
    expect(result.current).toBe(false)
  })

  it('deberia agregar event listener al montar el componente', () => {
    renderHook(() => useScroll(50))
    
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('deberia remover event listener al desmontar el componente', () => {
    const { unmount } = renderHook(() => useScroll(50))
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('deberia retornar true cuando scroll supera el threshold por defecto', () => {
    mockScrollY.mockReturnValue(60)
    
    const { result } = renderHook(() => useScroll())
    
    // simular el evento scroll
    act(() => {
      const scrollHandler = vi.mocked(window.addEventListener).mock.calls[0][1] as EventListener
      scrollHandler(new Event('scroll'))
    })
    
    expect(result.current).toBe(true)
  })

  it('deberia retornar false cuando scroll es menor al threshold por defecto', () => {
    mockScrollY.mockReturnValue(30)
    
    const { result } = renderHook(() => useScroll())
    
    // simular evento scroll
    act(() => {
      const scrollHandler = vi.mocked(window.addEventListener).mock.calls[0][1] as EventListener
      scrollHandler(new Event('scroll'))
    })
    
    expect(result.current).toBe(false)
  })

  it('deberia usar threshold personalizado correctamente', () => {
    mockScrollY.mockReturnValue(80)
    
    const { result } = renderHook(() => useScroll(100))
    
    // simular evento scroll
    act(() => {
      const scrollHandler = vi.mocked(window.addEventListener).mock.calls[0][1] as EventListener
      scrollHandler(new Event('scroll'))
    })
    
    expect(result.current).toBe(false)
  })

  it('deberia cambiar de false a true cuando se supera el threshold', () => {
    const { result } = renderHook(() => useScroll(50))
    
    mockScrollY.mockReturnValue(30)
    act(() => {
      const scrollHandler = vi.mocked(window.addEventListener).mock.calls[0][1] as EventListener
      scrollHandler(new Event('scroll'))
    })
    expect(result.current).toBe(false)
    
    // mayor al threshold
    mockScrollY.mockReturnValue(70)
    act(() => {
      const scrollHandler = vi.mocked(window.addEventListener).mock.calls[0][1] as EventListener
      scrollHandler(new Event('scroll'))
    })
    expect(result.current).toBe(true)
  })

  it('deberia actualizar listener cuando threshold cambia', () => {
    const { rerender } = renderHook((threshold) => useScroll(threshold), {
      initialProps: 50
    })
    
    // cambiar threshold
    rerender(100)
    
    // debe llamar addEventListener nuevamente con la nueva funcion
    expect(window.addEventListener).toHaveBeenCalledTimes(2)
  })
})