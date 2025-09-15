import { useState, useEffect } from "react"
import AuthenticatedNavbar from "../layout/AuthenticateNavbar"
import SecondaryNavbar from "../layout/SecondaryNavbar"
import CategoryFilter from "./CategoryFilter"
import ProductCard from "../ui/ProductCard"
import Pagination from "../ui/Pagination"
import usePagination from "../../hooks/usepagination"
import { fetchAllProducts, fetchProductsByCategory, type Product } from "../../services/productsService"

const Productos = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const pagination = usePagination({
    totalItems,
    itemsPerPage: 30,
    groupSize: 3
  })

  const loadProducts = async () => {
    try {
      setError(null)
      pagination.setLoading(true)
      let data
      if (selectedCategory === 'all') {
        data = await fetchAllProducts(30, pagination.skip)
      } else {
        data = await fetchProductsByCategory(selectedCategory, 30, pagination.skip)
      }
      setProducts(data.products)

      // actualizar total
      if (totalItems === 0) {
        setTotalItems(data.total)
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Error al cargar productos')
    } finally {
      pagination.setLoading(false)
    }
  }

  useEffect(() => {
    if (totalItems > 0 || pagination.currentPage === 1) {
      loadProducts()
    }
  }, [pagination.currentPage, selectedCategory])

  // para cambio de categoría
  const handleCategoryChange = (slug: string) => {
    console.log('Categoría seleccionada:', slug)
    setSelectedCategory(slug)

    if (pagination.currentPage !== 1) {
      pagination.goToPage(1)
    } else {
      loadProducts()
    }
  }

  return (
    <>
      <AuthenticatedNavbar
        cartItemCount={2}
        onCartClick={() => console.log('Carrito clicked')}
      />
      <SecondaryNavbar
        activeTab="products"
        onSearch={(query) => console.log('Search query:', query)}
      />
      <div className="main-layout">
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
        />

        <div className="products-area">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="products-grid">
            {products.map(product => (
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
          {totalItems > 30 && (
            <Pagination
              currentPage={pagination.currentPage}
              visiblePages={pagination.visiblePages}
              hasPrevGroup={pagination.hasPrevGroup}
              hasNextGroup={pagination.hasNextGroup}
              loading={pagination.loading}
              onPageChange={pagination.goToPage}
              onPrevGroup={pagination.goToPrevGroup}
              onNextGroup={pagination.goToNextGroup}
            />
          )}
        </div>
      </div>
      <h1>Productos</h1>
    </>
  )
}

export default Productos