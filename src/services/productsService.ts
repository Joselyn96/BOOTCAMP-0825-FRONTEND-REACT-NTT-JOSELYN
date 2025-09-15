const BASE_URL = 'https://dummyjson.com'

export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
  category: string
  stock: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// obtener productos de API
export const fetchAllProducts = async (limit: number = 30, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,stock`
    )
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// productos por categoría
export const fetchProductsByCategory = async (
  category: string, 
  limit: number = 30, 
  skip: number = 0
): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,stock`
    )
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}
//*
// NUEVA FUNCIÓN: buscar productos por término
export const searchProducts = async (
  searchTerm: string,
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,stock`
    )
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

// NUEVA FUNCIÓN: buscar productos por término y filtrar por categoría
export const searchProductsByCategory = async (
  searchTerm: string,
  category: string,
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> => {
  try {
    // Primero obtenemos todos los resultados de búsqueda
    const searchResponse = await searchProducts(searchTerm, 100, 0) // Pedimos más para filtrar
    
    // Filtramos por categoría
    const filteredProducts = searchResponse.products.filter(
      product => product.category === category
    )
    
    // Aplicamos paginación manual
    const startIndex = skip
    const endIndex = skip + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      skip,
      limit
    }
  } catch (error) {
    console.error('Error searching products by category:', error)
    throw error
  }
}
//*
// lista de categorías
export const fetchCategoryList = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/category-list`)
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching category list:', error)
    throw error
  }
}

