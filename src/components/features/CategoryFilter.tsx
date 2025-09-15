// components/features/CategoryFilter.tsx
import { useState } from 'react'
import CategoryFilterStyled from './CategoryFilter.styled'

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

  // Datos mock para maquetado
  const categories: Category[] = [
    { name: 'All categories', count: 194, slug: 'all' },
    { name: 'Tablet', count: 8, slug: 'tablets' },
    { name: 'Laptop', count: 15, slug: 'laptops' },
    { name: 'Headphones', count: 12, slug: 'mobile-accessories' },
    { name: 'Console', count: 6, slug: 'gaming' },
    { name: 'Other', count: 25, slug: 'other' }
  ]

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
    onCategoryChange?.(slug)
    // En móvil, cerrar el dropdown después de seleccionar
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