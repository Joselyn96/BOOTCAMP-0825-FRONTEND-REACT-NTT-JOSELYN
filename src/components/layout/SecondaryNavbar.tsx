import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SecondaryNavbarStyled from './SecondaryNavbar.styled'

interface SecondaryNavbarProps {
  activeTab: 'products' | 'orders' | 'profile'
  onSearch?: (query: string) => void
  onClearSearch?: () => void
  searchValue?: string
}

const SecondaryNavbar = ({ 
  activeTab, 
  onSearch, 
  onClearSearch, 
  searchValue = '' 
}: SecondaryNavbarProps) => {
  const [searchQuery, setSearchQuery] = useState(searchValue)
  const [searchError, setSearchError] = useState('')
  const navigate = useNavigate()

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'products':
        navigate('/products')
        break
      case 'orders':
        navigate('')
        break
      case 'profile':
        navigate('')
        break
      default:
        break
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSearchError('')
    if (onClearSearch) {
      onClearSearch()
    }
  }

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim()
    
    // valida mínimo 3 caracteres
    if (trimmedQuery.length < 3) {
      setSearchError('Mínimo son 3 caracteres')
      return
    }
    
    setSearchError('')
    if (onSearch) {
      onSearch(trimmedQuery)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // limpiar error
    if (value.length >= 3) {
      setSearchError('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SecondaryNavbarStyled.NavContainer>
      <SecondaryNavbarStyled.NavTabs>
        <SecondaryNavbarStyled.NavTab 
          active={activeTab === 'products'} 
          onClick={() => handleTabClick('products')}
        >
          Products
        </SecondaryNavbarStyled.NavTab>
        <SecondaryNavbarStyled.NavTab 
          active={activeTab === 'orders'} 
          onClick={() => handleTabClick('orders')}
        >
          My orders
        </SecondaryNavbarStyled.NavTab>
        <SecondaryNavbarStyled.NavTab 
          active={activeTab === 'profile'} 
          onClick={() => handleTabClick('profile')}
        >
          Profile
        </SecondaryNavbarStyled.NavTab>
      </SecondaryNavbarStyled.NavTabs>

      <div>
        <SecondaryNavbarStyled.SearchContainer className="search-container-relative">
          <SecondaryNavbarStyled.SearchInput
            type="text"
            placeholder="Search any things"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="search-clear-button"
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
          
          <SecondaryNavbarStyled.SearchButton onClick={handleSearch}>
            <SecondaryNavbarStyled.MaterialIcon>search</SecondaryNavbarStyled.MaterialIcon>
          </SecondaryNavbarStyled.SearchButton>
        </SecondaryNavbarStyled.SearchContainer>
        
        {searchError && (
          <div className="search-error-message">
            {searchError}
          </div>
        )}
      </div>
    </SecondaryNavbarStyled.NavContainer>
  )
}

export default SecondaryNavbar