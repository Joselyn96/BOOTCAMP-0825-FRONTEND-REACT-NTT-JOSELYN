import styled from 'styled-components'

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  width: 280px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: #e0e0e0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const WishlistButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  svg {
    width: 18px;
    height: 18px;
    color: #80736bff;
  }
`

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductPrice = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
  margin: 0 0 0.75rem 0;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
`

const StarIcon = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#e6b230ff' : '#d1d5db'};
  font-size: 1rem;
`

const AddToCartButton = styled.button`
  width: 100%;
  background: #e6b230ff;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #d39313ff;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`

const ProductCardStyled = {
  Card,
  ImageContainer,
  ProductImage,
  WishlistButton,
  ProductTitle,
  ProductPrice,
  RatingContainer,
  StarIcon,
  AddToCartButton
}

export default ProductCardStyled