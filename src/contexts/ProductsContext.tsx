import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchAllProducts, type Product } from '../services/productsService'

interface ProductsContextType {
  allProducts: Product[]
  isLoaded: boolean
  isLoading: boolean
  error: string | null

  loadAllProducts: () => Promise<void>
  clearError: () => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadAllProducts = async () => {
    if (isLoaded && allProducts.length > 0) {
      console.log('Productos ya cargados desde caché')
      return
    }

    try {
      setError(null)
      setIsLoading(true)
      console.log('Cargando todos los productos por primera vez...')
      
      // cargar todos los productos
      const data = await fetchAllProducts(1000, 0)
      
      setAllProducts(data.products)
      setIsLoaded(true)
      console.log(`${data.products.length} productos cargados y cacheados`)
      
    } catch (error) {
      console.error('Error loading all products:', error)
      setError('Error al cargar productos')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        isLoaded,
        isLoading,
        error,
        loadAllProducts,
        clearError
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider')
  }
  return context
}

export default ProductsContext