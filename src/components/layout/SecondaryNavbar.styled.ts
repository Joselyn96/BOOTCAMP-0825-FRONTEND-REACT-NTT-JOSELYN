import styled from 'styled-components'

const NavContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e1e5e9;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    gap: 1rem;
    flex-direction: column;
  }
`

const NavTabs = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
    order: 2;
  }
`

const NavTab = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#333' : '#666'};
  padding: 0.5rem 0;
  border-bottom: ${props => props.active ? '2px solid #28a745' : '2px solid transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: #28a745;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
    order: 1;
  }
`

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.9rem;
  color: #333;

  &::placeholder {
    color: #999;
  }
`

const SearchButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #218838;
  }
`

const MaterialIcon = styled.span`
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 18px;
  line-height: 1;
  color: white;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
`

const SecondaryNavbarStyled = {
  NavContainer,
  NavTabs,
  NavTab,
  SearchContainer,
  SearchInput,
  SearchButton,
  MaterialIcon
}

export default SecondaryNavbarStyled