import { useState } from 'react'
import ProductCardStyled from './ProductCard.styled'

interface ProductCardProps {
  id: number
  title: string
  price: number
  image: string
  rating: number
  onAddToCart: (id: number) => void
  onWishlistClick?: (id: number) => void
}

const ProductCard = ({
  id,
  title,
  price,
  image,
  rating,
  onAddToCart,
  onWishlistClick
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(id)
  }

  const handleWishlistClick = () => {
    setIsInWishlist(!isInWishlist)
    if (onWishlistClick) {
      onWishlistClick(id)
    }
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <ProductCardStyled.StarIcon key={i} filled={i <= fullStars}>
          ★
        </ProductCardStyled.StarIcon>
      )
    }
    return stars
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <ProductCardStyled.Card>
      <ProductCardStyled.ImageContainer>
        <ProductCardStyled.ProductImage
          src={imageError ? '/placeholder-image.jpg' : image}
          alt={title}
          onError={handleImageError}
        />
        <ProductCardStyled.WishlistButton
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          {isInWishlist ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )}
        </ProductCardStyled.WishlistButton>
      </ProductCardStyled.ImageContainer>

      <ProductCardStyled.ProductTitle>
        {title}
      </ProductCardStyled.ProductTitle>

      <ProductCardStyled.ProductPrice>
        {formatPrice(price)}
      </ProductCardStyled.ProductPrice>

      <ProductCardStyled.RatingContainer>
        {renderStars()}
      </ProductCardStyled.RatingContainer>

      <ProductCardStyled.AddToCartButton onClick={handleAddToCart}>
        Add to cart
      </ProductCardStyled.AddToCartButton>
    </ProductCardStyled.Card>
  )
}

export default ProductCard