import { useState } from 'react'
import SecondaryNavbar from '../components/layout/SecondaryNavbar'
import { useCart } from '../hooks/useCart'
import CartStyled from './Cart.styled'

const Cart = () => {
  const { items, totalPrice, updateQuantity, removeItem } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    district: '',
    address: '',
    reference: '',
    cellphone: ''
  })

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNextStep = () => {
    setCurrentStep(2)
  }

  const handlePrevStep = () => {
    setCurrentStep(1)
  }

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos de compra:', { items, totalPrice, formData })
    alert('¡Purchase completed successfully!')
  }

  // si carrito esta vacío
  if (items.length === 0) {
    return (
      <>
        <CartStyled.NavbarContainer>
          <SecondaryNavbar activeTab="orders" />
        </CartStyled.NavbarContainer>
        
        <CartStyled.Container>
          <CartStyled.Content>
            <div style={{ 
              textAlign: 'center', 
              padding: '50px', 
              fontSize: '18px',
              color: '#666' 
            }}>
              Your cart is empty
            </div>
          </CartStyled.Content>
        </CartStyled.Container>
      </>
    )
  }

  return (
    <>
      <CartStyled.NavbarContainer>
        <SecondaryNavbar activeTab="orders" />
      </CartStyled.NavbarContainer>
      
      <CartStyled.Container>
        <CartStyled.Content>
          <CartStyled.ItemsSection>
            {items.map((item) => (
              <CartStyled.CartItem key={item.id}>
                <CartStyled.ItemImage>
                  <img src={item.image} alt={item.title} />
                </CartStyled.ItemImage>
                
                <CartStyled.ItemDetails>
                  <CartStyled.ItemName>{item.title}</CartStyled.ItemName>
                  <CartStyled.ItemSpec>Cantidad: {item.quantity}</CartStyled.ItemSpec>
                </CartStyled.ItemDetails>
                
                <CartStyled.ItemPrice>$ {item.price.toFixed(2)}</CartStyled.ItemPrice>
                
                <CartStyled.QuantityControls>
                  <CartStyled.QuantityButton 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </CartStyled.QuantityButton>
                  <CartStyled.QuantityInput value={item.quantity} readOnly />
                  <CartStyled.QuantityButton 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </CartStyled.QuantityButton>
                </CartStyled.QuantityControls>
                
                <CartStyled.RemoveButton onClick={() => handleRemoveItem(item.id)}>
                  ×
                </CartStyled.RemoveButton>
              </CartStyled.CartItem>
            ))}
            
            <CartStyled.ContinueButton>
              Continue shopping
            </CartStyled.ContinueButton>
          </CartStyled.ItemsSection>
          
          <CartStyled.SummarySection>
            {currentStep === 1 ? (
              <>
                <CartStyled.SummaryHeader>Cart total</CartStyled.SummaryHeader>
                
                <CartStyled.SummaryRow>
                  <span>Subtotal</span>
                  <span>$ {totalPrice.toFixed(2)}</span>
                </CartStyled.SummaryRow>
                
                <CartStyled.CouponSection>
                  <CartStyled.CouponInput 
                    placeholder="Enter coupon code"
                  />
                  <CartStyled.ApplyButton>Apply</CartStyled.ApplyButton>
                </CartStyled.CouponSection>
                
                <CartStyled.CountrySelect>
                  <option>County</option>
                </CartStyled.CountrySelect>
                
                <CartStyled.TotalRow>
                  <span>Total amount</span>
                  <span>$ {totalPrice.toFixed(2)}</span>
                </CartStyled.TotalRow>
                
                <CartStyled.CheckoutButton onClick={handleNextStep}>
                  Next
                </CartStyled.CheckoutButton>
              </>
            ) : (
              <>
                <CartStyled.SummaryHeader>Shipping information</CartStyled.SummaryHeader>
                
                <form onSubmit={handlePurchase}>
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="nombres"
                      placeholder="first name"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="apellidos"
                      placeholder="last names"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="distrito"
                      placeholder="District"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="direccion"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="referencia"
                      placeholder="Reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="tel"
                      name="celular"
                      placeholder="Cell phone"
                      value={formData.cellphone}
                      onChange={handleInputChange}
                      required
                    />
                  </CartStyled.FormGroup>
                  
                  <CartStyled.TotalRow style={{ marginTop: '20px' }}>
                    <span>Total amount payable</span>
                    <span>$ {totalPrice.toFixed(2)}</span>
                  </CartStyled.TotalRow>
                  
                  <CartStyled.FormButtonGroup>
                    <CartStyled.BackButton type="button" onClick={handlePrevStep}>
                       Back
                    </CartStyled.BackButton>
                    <CartStyled.CheckoutButton type="submit">
                      Buy
                    </CartStyled.CheckoutButton>
                  </CartStyled.FormButtonGroup>
                </form>
              </>
            )}
          </CartStyled.SummarySection>
        </CartStyled.Content>
      </CartStyled.Container>
    </>
  )
}

export default Cart