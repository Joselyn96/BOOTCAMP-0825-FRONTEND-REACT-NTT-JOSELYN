import { useState, useMemo, useCallback } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  groupSize?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  visiblePages: number[]
  hasPrevGroup: boolean
  hasNextGroup: boolean
  loading: boolean
  skip: number
  goToPage: (page: number) => void
  goToPrevGroup: () => void
  goToNextGroup: () => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

const usePagination = ({
  totalItems,
  itemsPerPage,
  groupSize = 3
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  const currentGroup = useMemo(() => {
    return Math.floor((currentPage - 1) / groupSize)
  }, [currentPage, groupSize])

  // calcula páginas que se van a mostrar
  const visiblePages = useMemo(() => {
    const startPage = currentGroup * groupSize + 1
    const endPage = Math.min(startPage + groupSize - 1, totalPages)
    
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }, [currentGroup, groupSize, totalPages])

  // ve si hay grupos antes o despues
  const hasPrevGroup = useMemo(() => {
    return currentGroup > 0
  }, [currentGroup])

  const hasNextGroup = useMemo(() => {
    const lastPageInCurrentGroup = currentGroup * groupSize + groupSize
    return lastPageInCurrentGroup < totalPages
  }, [currentGroup, groupSize, totalPages])

  const skip = useMemo(() => {
    return (currentPage - 1) * itemsPerPage
  }, [currentPage, itemsPerPage])

  // para ir a una pagina especifica
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page)
    }
  }, [currentPage, totalPages])


  const goToPrevGroup = useCallback(() => {
    if (hasPrevGroup) {
      const newGroup = currentGroup - 1
      const newPage = newGroup * groupSize + 1
      setCurrentPage(newPage)
    }
  }, [currentGroup, groupSize, hasPrevGroup])

  // para ir al grupo siguiente
  const goToNextGroup = useCallback(() => {
    if (hasNextGroup) {
      const newGroup = currentGroup + 1
      const newPage = newGroup * groupSize + 1
      setCurrentPage(newPage)
    }
  }, [currentGroup, groupSize, hasNextGroup])

  // resetear
  const reset = useCallback(() => {
    setCurrentPage(1)
    setLoading(false)
  }, [])

  return {
    currentPage,
    totalPages,
    visiblePages,
    hasPrevGroup,
    hasNextGroup,
    loading,
    skip,
    goToPage,
    goToPrevGroup,
    goToNextGroup,
    setLoading,
    reset
  }
}

export default usePagination