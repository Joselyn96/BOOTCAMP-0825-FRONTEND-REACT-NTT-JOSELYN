// components/layout/SecondaryNavbar.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SecondaryNavbarStyled from './SecondaryNavbar.styled'

interface SecondaryNavbarProps {
  activeTab: 'products' | 'orders' | 'profile'
  onSearch?: (query: string) => void
}

const SecondaryNavbar = ({ activeTab, onSearch }: SecondaryNavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'products':
        navigate('/products')
        break
      case 'orders':
        navigate('/orders')
        break
      case 'profile':
        navigate('/profile')
        break
      default:
        break
    }
  }

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
    console.log('Searching for:', searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SecondaryNavbarStyled.NavContainer>
      {/* Tabs de navegación */}
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

      {/* Barra de búsqueda */}
      <SecondaryNavbarStyled.SearchContainer>
        <SecondaryNavbarStyled.SearchInput
          type="text"
          placeholder="Search any things"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SecondaryNavbarStyled.SearchButton onClick={handleSearch}>
          <SecondaryNavbarStyled.MaterialIcon>search</SecondaryNavbarStyled.MaterialIcon>
        </SecondaryNavbarStyled.SearchButton>
      </SecondaryNavbarStyled.SearchContainer>
    </SecondaryNavbarStyled.NavContainer>
  )
}

export default SecondaryNavbar