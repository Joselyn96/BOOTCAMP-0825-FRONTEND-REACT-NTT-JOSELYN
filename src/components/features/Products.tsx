import { useState, useEffect, useMemo } from "react"
import AuthenticatedNavbar from "../layout/AuthenticateNavbar"
import SecondaryNavbar from "../layout/SecondaryNavbar"
import CategoryFilter from "./CategoryFilter"
import ProductCard from "../ui/ProductCard"
import Pagination from "../ui/Pagination"
import usePagination from "../../hooks/usepagination"
import { useProducts } from "../../contexts/ProductsContext"
import type { Product } from "../../services/productsService"

const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // contexto global
  const { allProducts, isLoading, error, loadAllProducts } = useProducts()

  // productos filtrados
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = allProducts

    // filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product: Product) => product.category === selectedCategory)
    }

    // filtrar por busqueda
    if (isSearching && searchTerm.trim().length >= 3) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter((product: Product) =>
        product.title.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [allProducts, selectedCategory, isSearching, searchTerm])

  const pagination = usePagination({
    totalItems: filteredProducts.length,
    itemsPerPage: 30,
    groupSize: 3
  })

  const currentPageProducts = useMemo(() => {
    const start = pagination.skip
    const end = start + 30
    return filteredProducts.slice(start, end)
  }, [filteredProducts, pagination.skip])

  useEffect(() => {
    loadAllProducts()
  }, [loadAllProducts])

  useEffect(() => {
    if (pagination.currentPage !== 1) {
      pagination.goToPage(1)
    }
  }, [selectedCategory, searchTerm, isSearching])

  const handleCategoryChange = (slug: string) => {
    console.log('Categoría seleccionada:', slug)
    setSelectedCategory(slug)
  }

  // búsqueda
  const handleSearch = (query: string) => {
    console.log('Búsqueda local:', query)
    setSearchTerm(query)
    setIsSearching(true)
  }

  // limpiar búsqueda
  const handleClearSearch = () => {
    console.log('Limpiando búsqueda')
    setSearchTerm('')
    setIsSearching(false)
  }

  return (
    <>
      <AuthenticatedNavbar
        cartItemCount={1}
        onCartClick={() => console.log('Carrito clicked')}
      />

      <SecondaryNavbar
        activeTab="products"
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        searchValue={searchTerm}
      />

      <div className="main-layout">
        <CategoryFilter onCategoryChange={handleCategoryChange} />

        <div className="products-area">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {isLoading && (
            <div>Cargando productos...</div>
          )}
          
          {isSearching && searchTerm && (
            <div style={{
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #dee2e6'
            }}>
              <span>Mostrando resultados para: <strong>"{searchTerm}"</strong></span>
              {selectedCategory !== 'all' && (
                <span> en la categoría <strong>{selectedCategory}</strong></span>
              )}
              <span> ({filteredProducts.length} productos encontrados)</span>
            </div>
          )}

          <div className="products-grid">
            {currentPageProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.thumbnail}
                rating={product.rating}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onWishlistClick={(id) => console.log('Wishlist:', id)}
              />
            ))}
          </div>

          {filteredProducts.length > 30 && (
            <Pagination
              currentPage={pagination.currentPage}
              visiblePages={pagination.visiblePages}
              hasPrevGroup={pagination.hasPrevGroup}
              hasNextGroup={pagination.hasNextGroup}
              loading={isLoading}
              onPageChange={pagination.goToPage}
              onPrevGroup={pagination.goToPrevGroup}
              onNextGroup={pagination.goToNextGroup}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Productos