import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Pagination from './Pagination'

describe('pagination Component', () => {
  const mockOnPageChange = vi.fn()
  const mockOnPrevGroup = vi.fn()
  const mockOnNextGroup = vi.fn()

  const defaultProps = {
    currentPage: 2,
    visiblePages: [1, 2, 3],
    hasPrevGroup: true,
    hasNextGroup: true,
    onPageChange: mockOnPageChange,
    onPrevGroup: mockOnPrevGroup,
    onNextGroup: mockOnNextGroup,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deberia renderizar la paginación correctamente', () => {
    render(<Pagination {...defaultProps} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('no debe renderizar nada cuando visiblePages esta vacio', () => {
    const { container } = render(
      <Pagination 
        {...defaultProps} 
        visiblePages={[]}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('deberia mostrar boton anterior cuando hasPrevGroup es true', () => {
    render(<Pagination {...defaultProps} hasPrevGroup={true} />)
    
    const prevButton = screen.getByLabelText('Previous group')
    expect(prevButton).toBeInTheDocument()
    expect(prevButton).toHaveTextContent('<')
  })

  it('deberia mostrar boton siguiente cuando hasNextGroup es true', () => {
    render(<Pagination {...defaultProps} hasNextGroup={true} />)
    
    const nextButton = screen.getByLabelText('Next group')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toHaveTextContent('>')
  })

  it('no deberia mostrar boton anterior cuando hasPrevGroup es false', () => {
    render(<Pagination {...defaultProps} hasPrevGroup={false} />)
    
    expect(screen.queryByLabelText('Previous group')).not.toBeInTheDocument()
  })

  it('no deberia mostrar boton siguiente cuando hasNextGroup es false', () => {
    render(<Pagination {...defaultProps} hasNextGroup={false} />)
    
    expect(screen.queryByLabelText('Next group')).not.toBeInTheDocument()
  })

  it('deberia marcar la pagina actual como activo', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)
    
    const currentPageButton = screen.getByLabelText('Page 2')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('deberia llamar onPageChange cuando se hace click en una pagina', () => {
    render(<Pagination {...defaultProps} />)
    
    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('deberia llamar onPrevGroup cuando se hace click en boton anterior', () => {
    render(<Pagination {...defaultProps} />)
    
    const prevButton = screen.getByLabelText('Previous group')
    fireEvent.click(prevButton)
    
    expect(mockOnPrevGroup).toHaveBeenCalled()
  })

  it('deberua llamar onNextGroup cuando se hace click en boton siguiente', () => {
    render(<Pagination {...defaultProps} />)
    
    const nextButton = screen.getByLabelText('Next group')
    fireEvent.click(nextButton)
    
    expect(mockOnNextGroup).toHaveBeenCalled()
  })

  it('deberia deshabilitar todos los botones cuando loading es true', () => {
    render(<Pagination {...defaultProps} loading={true} />)
    
    const pageButtons = screen.getAllByRole('button')
    pageButtons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('no deberia deshabilitar botones cuando loading es false', () => {
    render(<Pagination {...defaultProps} loading={false} />)
    
    const pageButtons = screen.getAllByRole('button')
    pageButtons.forEach(button => {
      expect(button).not.toBeDisabled()
    })
  })

  it('deberia usar loading como false por defecto', () => {
    const propsWithoutLoading = {
      currentPage: 1,
      visiblePages: [1, 2],
      hasPrevGroup: false,
      hasNextGroup: false,
      onPageChange: mockOnPageChange,
      onPrevGroup: mockOnPrevGroup,
      onNextGroup: mockOnNextGroup,
    }
    
    render(<Pagination {...propsWithoutLoading} />)
    
    const pageButtons = screen.getAllByRole('button')
    pageButtons.forEach(button => {
      expect(button).not.toBeDisabled()
    })
  })
})