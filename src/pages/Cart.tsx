import { useState } from 'react'
import SecondaryNavbar from '../components/layout/SecondaryNavbar'
import { useCart } from '../hooks/useCart'
import { useDistricts } from '../hooks/useDistricts'
import CartStyled from './Cart.styled'
import Alert from '../components/ui/Alert'

const Cart = () => {
  const { items, totalPrice, updateQuantity, removeItem, showAlert, alertType, alertMessage, showSuccessAlert, clearCart } = useCart()
  const { districts, isLoading: districtsLoading, error: districtsError } = useDistricts()
  const [currentStep, setCurrentStep] = useState(1)

  // estados del formulario corregidos
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    district: '',
    address: '',
    reference: '',
    cellphone: ''
  })

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    district: '',
    address: '',
    reference: '',
    cellphone: ''
  })

  const [showErrors, setShowErrors] = useState(false)

  // validación
  const validateName = (value: string) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (!value.trim()) return 'Campo obligatorio'
    if (!nameRegex.test(value)) return 'Debe ingresar un valor válido'
    return ''
  }

  const validatePhone = (value: string) => {
    const phoneRegex = /^[0-9]{9,15}$/
    if (!value.trim()) return 'Campo obligatorio'
    if (!phoneRegex.test(value)) return 'Debe ingresar un valor válido'
    return ''
  }

  const validateRequired = (value: string) => {
    if (!value.trim()) return 'Campo obligatorio'
    return ''
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const item = items.find(item => item.id === id)

    if (item && newQuantity > item.stock) {
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  // validacion en tiempo real
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    let error = ''
    if (name === 'firstname' || name === 'lastname') {
      error = validateName(value)
    } else if (name === 'cellphone') {
      error = validatePhone(value)
    } else if (name !== 'reference') {
      error = validateRequired(value)
    }

    setFormErrors({
      ...formErrors,
      [name]: error
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

    // validar todos los campos
    const newErrors = {
      firstname: validateName(formData.firstname),
      lastname: validateName(formData.lastname),
      district: validateRequired(formData.district),
      address: validateRequired(formData.address),
      reference: '',
      cellphone: validatePhone(formData.cellphone)
    }

    setFormErrors(newErrors)
    setShowErrors(true)

    // ver si hay errores
    const hasErrors = Object.values(newErrors).some(error => error !== '')

    if (hasErrors) {
      return
    }

    console.log('Datos de compra:', {
      nombre: formData.firstname,
      apellido: formData.lastname,
      telefono: formData.cellphone,
      distrito: formData.district,
      direccion: formData.address,
      referencia: formData.reference
    })
    showSuccessAlert('¡Su pedido se registró con éxito!')
    setFormData({
      firstname: '',
      lastname: '',
      district: '',
      address: '',
      reference: '',
      cellphone: ''
    })
    setTimeout(() => {
      clearCart()
      setCurrentStep(1)
    }, 3000)
    setShowErrors(false)
  }

  // si carrito esta vacio
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
                    disabled={item.quantity >= item.stock}
                    style={{
                      opacity: item.quantity >= item.stock ? 0.5 : 1,
                      cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer'
                    }}
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
                      name="firstname"
                      placeholder="first name"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: formErrors.firstname ? 'red' : '' }}
                    />
                    {(showErrors || formErrors.firstname) && formErrors.firstname && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.firstname}
                      </div>
                    )}
                  </CartStyled.FormGroup>

                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="lastname"
                      placeholder="last names"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: formErrors.lastname ? 'red' : '' }}
                    />
                    {(showErrors || formErrors.lastname) && formErrors.lastname && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.lastname}
                      </div>
                    )}
                  </CartStyled.FormGroup>

                  <CartStyled.FormGroup>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      style={{
                        borderColor: formErrors.district ? 'red' : '',
                        width: '100%',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        backgroundColor: 'white',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%276 8l4 4 4-4%27/%3e%3c/svg%3e")',
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '16px',
                        paddingRight: '40px'
                      }}
                    >
                      <option value="">Selecciona un distrito</option>
                      {districtsLoading && <option value="">Cargando distritos...</option>}
                      {districtsError && <option value="">Error al cargar distritos</option>}
                      {districts.map(district => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {(showErrors || formErrors.district) && formErrors.district && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.district}
                      </div>
                    )}
                  </CartStyled.FormGroup>

                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: formErrors.address ? 'red' : '' }}
                    />
                    {(showErrors || formErrors.address) && formErrors.address && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.address}
                      </div>
                    )}
                  </CartStyled.FormGroup>

                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="text"
                      name="reference"
                      placeholder="Reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                    />
                  </CartStyled.FormGroup>

                  <CartStyled.FormGroup>
                    <CartStyled.FormInput
                      type="tel"
                      name="cellphone"
                      placeholder="Cell phone"
                      value={formData.cellphone}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: formErrors.cellphone ? 'red' : '' }}
                    />
                    {(showErrors || formErrors.cellphone) && formErrors.cellphone && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.cellphone}
                      </div>
                    )}
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
      <Alert
        show={showAlert}
        type={alertType}
        message={alertMessage}
      />
    </>
  )
}

export default Cart