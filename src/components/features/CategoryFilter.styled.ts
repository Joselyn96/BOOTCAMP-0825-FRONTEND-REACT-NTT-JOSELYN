import styled from 'styled-components'

const Container = styled.div`
  background: white;
  border-right: 1px solid #e1e5e9;
  padding: 1.5rem;
  width: 250px;
  height: 100vh;
  position: sticky;
  top: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e1e5e9;
    padding: 1rem;
  }
`

const Header = styled.h3<{ isOpen?: boolean }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &::after {
      content: '▼';
      font-size: 0.8rem;
      color: #666;
      transition: transform 0.2s ease;
      transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
  }
`

const CategoryList = styled.ul<{ isOpen?: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`

const CategoryItem = styled.li`
  padding: 0.75rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &.active {
    background: #e8f5e8;
    color: #28a745;
    font-weight: 500;
  }
`

const CategoryName = styled.span`
  font-size: 0.9rem;
  color: inherit;
`

const CategoryCount = styled.span`
  font-size: 0.8rem;
  color: #666;
  font-weight: 400;
  
  .active & {
    color: #28a745;
    font-weight: 500;
  }
`

const CategoryFilterStyled = {
  Container,
  Header,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryCount
}

export default CategoryFilterStyled