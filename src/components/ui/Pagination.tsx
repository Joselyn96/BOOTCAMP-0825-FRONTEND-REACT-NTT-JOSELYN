import PaginationStyled from './Pagination.styled'

interface PaginationProps {
  currentPage: number
  visiblePages: number[]
  hasPrevGroup: boolean
  hasNextGroup: boolean
  loading?: boolean
  onPageChange: (page: number) => void
  onPrevGroup: () => void
  onNextGroup: () => void
}

const Pagination = ({
  currentPage,
  visiblePages,
  hasPrevGroup,
  hasNextGroup,
  loading = false,
  onPageChange,
  onPrevGroup,
  onNextGroup
}: PaginationProps) => {
  
  if (visiblePages.length === 0) {
    return null
  }

  return (
    <PaginationStyled.Container>
      {hasPrevGroup && (
        <PaginationStyled.NavigationButton
          onClick={onPrevGroup}
          disabled={loading}
          aria-label="Previous group"
        >
          &lt;
        </PaginationStyled.NavigationButton>
      )}

      {visiblePages.map((page) => (
        <PaginationStyled.PageButton
          key={page}
          onClick={() => onPageChange(page)}
          isActive={page === currentPage}
          disabled={loading}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
            {page}
        </PaginationStyled.PageButton>
      ))}

      {hasNextGroup && (
        <PaginationStyled.NavigationButton
          onClick={onNextGroup}
          disabled={loading}
          aria-label="Next group"
        >
          &gt;
        </PaginationStyled.NavigationButton>
      )}
    </PaginationStyled.Container>
  )
}

export default Pagination