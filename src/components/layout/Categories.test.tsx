import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Categories from './Categories'

describe('Categories Component', () => {
  it('deberia renderizar el titulo principal correctamente', () => {
    render(<Categories />)
    
    expect(screen.getByText('Discover our products')).toBeInTheDocument()
  })

  it('deberia renderizar el subtitulo correctamente', () => {
    render(<Categories />)
    
    expect(screen.getByText('Explore our wide selection of products organized by category')).toBeInTheDocument()
  })

  it('deberia renderizar todos los nombres de categorias', () => {
    render(<Categories />)
    
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('Fragances')).toBeInTheDocument()
    expect(screen.getByText('Skincare')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('clothes')).toBeInTheDocument()
  })

  it('deberia renderizar todas las descripciones de categorias', () => {
    render(<Categories />)
    
    expect(screen.getByText('Latest models and technology')).toBeInTheDocument()
    expect(screen.getByText('Power and performance')).toBeInTheDocument()
    expect(screen.getByText('Exclusive fragrances')).toBeInTheDocument()
    expect(screen.getByText('Skin care for everyone')).toBeInTheDocument()
    expect(screen.getByText('Fresh produce')).toBeInTheDocument()
    expect(screen.getByText('Home decor')).toBeInTheDocument()
  })

  it('deberia renderizar todas las imagenes con alt text correcto', () => {
    render(<Categories />)
    
    expect(screen.getByAltText('Smartphones')).toBeInTheDocument()
    expect(screen.getByAltText('Laptops')).toBeInTheDocument()
    expect(screen.getByAltText('Fragances')).toBeInTheDocument()
    expect(screen.getByAltText('Skincare')).toBeInTheDocument()
    expect(screen.getByAltText('Groceries')).toBeInTheDocument()
    expect(screen.getByAltText('clothes')).toBeInTheDocument()
  })

  it('deberia tener 6 categorias en total', () => {
    render(<Categories />)
    
    const categoryNames = screen.getAllByText(/Smartphones|Laptops|Fragances|Skincare|Groceries|clothes/)
    expect(categoryNames).toHaveLength(6)
  })

  it('deberia tener imagenes con src correcto', () => {
    render(<Categories />)
    
    const smartphonesImage = screen.getByAltText('Smartphones')
    const laptopsImage = screen.getByAltText('Laptops')
    const fragancesImage = screen.getByAltText('Fragances')
    
    expect(smartphonesImage).toHaveAttribute('src', '/smartphones.png')
    expect(laptopsImage).toHaveAttribute('src', '/laptops.png')
    expect(fragancesImage).toHaveAttribute('src', '/fragance.png')
  })

  it('deberia renderizar todas las imagenes sin errores', () => {
    render(<Categories />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(6)
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('deberia tener estructura de grid con 6 items', () => {
    const { container } = render(<Categories />)
    
    // verifica que hay 6 items de categoria
    const categoryItems = container.querySelectorAll('*[alt]')
    expect(categoryItems.length).toBeGreaterThanOrEqual(6)
  })

  it('deberia combinar correctamente nombre y descripcion para cada categoria', () => {
    render(<Categories />)
    
    // smartphones
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    expect(screen.getByText('Latest models and technology')).toBeInTheDocument()
    
    // laptops
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('Power and performance')).toBeInTheDocument()
    
    // fragances
    expect(screen.getByText('Fragances')).toBeInTheDocument()
    expect(screen.getByText('Exclusive fragrances')).toBeInTheDocument()
  })

  it('deberia renderizar la estructura completa del componente', () => {
    render(<Categories />)
    
    // header
    expect(screen.getByText('Discover our products')).toBeInTheDocument()
    expect(screen.getByText('Explore our wide selection of products organized by category')).toBeInTheDocument()
    
    // ccategories
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('Fragances')).toBeInTheDocument()
    expect(screen.getByText('Skincare')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('clothes')).toBeInTheDocument()
  })

  it('deberia tener fallback de imagen funcionando', () => {
    render(<Categories />)
    
    const images = screen.getAllByRole('img')
    
    images.forEach(img => {
      const src = img.getAttribute('src')
      expect(src).toBeTruthy()
      expect(src).not.toBe('/placeholder.svg')
    })
  })

  it('deberia mantener consistencia en la estructura de datos', () => {
    render(<Categories />)
    
    // verifica que cada categoria tiene nombr descripcion e imagen
    const categories = [
      { name: 'Smartphones', desc: 'Latest models and technology' },
      { name: 'Laptops', desc: 'Power and performance' },
      { name: 'Fragances', desc: 'Exclusive fragrances' },
      { name: 'Skincare', desc: 'Skin care for everyone' },
      { name: 'Groceries', desc: 'Fresh produce' },
      { name: 'clothes', desc: 'Home decor' }
    ]
    
    categories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
      expect(screen.getByText(category.desc)).toBeInTheDocument()
      expect(screen.getByAltText(category.name)).toBeInTheDocument()
    })
  })
})