import { useState } from 'react'
import NewsletterStyled from './Newsletter.styled'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí manejarías la suscripción
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <NewsletterStyled.Container>
      <NewsletterStyled.ContainerInner>
        <NewsletterStyled.Content>
          <NewsletterStyled.TextSection>
            <NewsletterStyled.Title>
              Stay home and buy what you need in our store
            </NewsletterStyled.Title>
            <NewsletterStyled.Subtitle>
              Start Your Daily Shopping with Nest Mart
            </NewsletterStyled.Subtitle>
            <NewsletterStyled.Form onSubmit={handleSubmit}>
              <NewsletterStyled.Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <NewsletterStyled.Button type="submit">
                Subscribe
              </NewsletterStyled.Button>
            </NewsletterStyled.Form>
          </NewsletterStyled.TextSection>
          
          <NewsletterStyled.ImageSection>
            <NewsletterStyled.ProductImage 
              src="/headphones-product.jpg" 
              alt="Headphones" 
            />
            <NewsletterStyled.ProductImage 
              src="/grocery-bag-products.jpg" 
              alt="Grocery products" 
            />
          </NewsletterStyled.ImageSection>
        </NewsletterStyled.Content>
      </NewsletterStyled.ContainerInner>
    </NewsletterStyled.Container>
  )
}

export default Newsletter