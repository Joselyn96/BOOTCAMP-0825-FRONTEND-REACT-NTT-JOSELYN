import { useState, useEffect, useMemo } from 'react'
import CategoryFilterStyled from './CategoryFilter.styled'
import { useProducts } from '../../contexts/ProductsContext'
import type { Product } from '../../services/productsService'

interface Category {
  name: string
  count: number
  slug: string
}

interface CategoryFilterProps {
  onCategoryChange?: (slug: string) => void
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isOpen, setIsOpen] = useState(false)
  
  // contexto global
  const { allProducts, loadAllProducts } = useProducts()

  useEffect(() => {
    loadAllProducts()
  }, [loadAllProducts])

  // conteos por categorio
  const categoryData = useMemo(() => {
    if (allProducts.length === 0) return {}

    const counts = allProducts.reduce((acc: Record<string, number>, product: Product) => {
      const category = product.category
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return counts
  }, [allProducts])

  // categorías con sus conteos
  const categories: Category[] = useMemo(() => [
    { name: 'All categories', count: allProducts.length, slug: 'all' },
    { name: 'Beauty', count: categoryData.beauty || 0, slug: 'beauty' },
    { name: 'Laptops', count: categoryData.laptops || 0, slug: 'laptops' },
    { name: 'Smartphones', count: categoryData.smartphones || 0, slug: 'smartphones' },
    { name: 'Furniture', count: categoryData.furniture || 0, slug: 'furniture' },
    { name: 'Groceries', count: categoryData.groceries || 0, slug: 'groceries' },
    { name: 'Tablets', count: categoryData.tablets || 0, slug: 'tablets' },
    { name: 'Men\'s Shirts', count: categoryData['mens-shirts'] || 0, slug: 'mens-shirts' }
  ], [allProducts.length, categoryData])

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
    onCategoryChange?.(slug)
    if (window.innerWidth <= 768) {
      setIsOpen(false)
    }
  }

  const toggleMobileDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CategoryFilterStyled.Container>
      <CategoryFilterStyled.Header
        isOpen={isOpen}
        onClick={toggleMobileDropdown}
      >
        Categories
      </CategoryFilterStyled.Header>

      <CategoryFilterStyled.CategoryList isOpen={isOpen}>
        {categories.map((category) => (
          <CategoryFilterStyled.CategoryItem
            key={category.slug}
            className={activeCategory === category.slug ? 'active' : ''}
            onClick={() => handleCategoryClick(category.slug)}
          >
            <CategoryFilterStyled.CategoryName>
              {category.name}
            </CategoryFilterStyled.CategoryName>
            <CategoryFilterStyled.CategoryCount>
              {category.count}
            </CategoryFilterStyled.CategoryCount>
          </CategoryFilterStyled.CategoryItem>
        ))}
      </CategoryFilterStyled.CategoryList>
    </CategoryFilterStyled.Container>
  )
}

export default CategoryFilter