import { useState, useEffect } from 'react'
import CategoryFilterStyled from './CategoryFilter.styled'
import { fetchProductsByCategory, fetchAllProducts } from '../../services/productsService'

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
  const [totalProducts, setTotalProducts] = useState(0)
  const [categoryData, setCategoryData] = useState({
    beauty: 0,
    laptops: 0,
    smartphones: 0,
    furniture: 0,
    groceries: 0,
    tablets: 0
  })

  //total de productos segun la api
  useEffect(() => {
    const loadData = async () => {
      try {
        // Total de productos
        const data = await fetchAllProducts()
        setTotalProducts(data.total)
        
        // Conteos por categoría
        const beauty = await fetchProductsByCategory('beauty')
        const laptops = await fetchProductsByCategory('laptops')
        const smartphones = await fetchProductsByCategory('smartphones')
        const furniture = await fetchProductsByCategory('furniture')
        const groceries = await fetchProductsByCategory('groceries')
        const tablets = await fetchProductsByCategory('tablets')
        
        setCategoryData({
          beauty: beauty.total,
          laptops: laptops.total,
          smartphones: smartphones.total,
          furniture: furniture.total,
          groceries: groceries.total,
          tablets: tablets.total
        })
        
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

const usedProducts = Object.values(categoryData).reduce((sum, count) => sum + count, 0)
  const otherCount = totalProducts - usedProducts

  const categories: Category[] = [
    { name: 'All categories', count: totalProducts, slug: 'all' },
    { name: 'Beauty', count: categoryData.beauty, slug: 'beauty' },
    { name: 'Laptops', count: categoryData.laptops, slug: 'laptops' },
    { name: 'Smartphones', count: categoryData.smartphones, slug: 'smartphones' },
    { name: 'Furniture', count: categoryData.furniture, slug: 'furniture' },
    { name: 'Groceries', count: categoryData.groceries, slug: 'groceries' },
    { name: 'Tablets', count: categoryData.tablets, slug: 'tablets' },
    { name: 'Other', count: otherCount > 0 ? otherCount : 0, slug: 'other' }
  ]

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