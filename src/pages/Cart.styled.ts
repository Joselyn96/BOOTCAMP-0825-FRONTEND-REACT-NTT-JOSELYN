import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffffff;
  padding: 20px;
`

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
     
  .search-container-relative,
  .search-error-message {
    display: none !important;
  }
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 120px 30px;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 60px;
    grid-template-rows: auto auto auto;
    gap: 10px;
  }
`

const ItemImage = styled.div`
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 25px;
`

const ItemName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2c5aa0;
`

const ItemSpec = styled.span`
  font-size: 14px;
  color: #666;
`

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-left: -30px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: fit-content;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const QuantityButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const QuantityInput = styled.input`
  border: none;
  text-align: center;
  width: 40px;
  padding: 8px 0;
  font-size: 14px;
`

const ItemTotal = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 20px;
  cursor: pointer;
  padding: 0px;
  

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-left: 50px;
    width: 30px;
    text-align: left;
  }
  
  &:hover {
    color: #c0392b;
  }
`

const ContinueButton = styled.button`
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  
  &:hover {
    background-color: #4cae4c;
  }
`

const SummarySection = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  height: fit-content;
`

const SummaryHeader = styled.div`
  background-color: #5cb85c;
  color: white;
  padding: 10px 20px;
  margin: -25px -25px 20px -25px;
  border-radius: 10px 10px 0 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
  
  span:last-child {
    font-weight: 600;
  }
`

const CouponSection = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`

const CouponInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const ApplyButton = styled.button`
  background: none;
  border: none;
  color: #2c5aa0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`

const CountrySelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 15px 0;
  background-color: white;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 600;
  padding-top: 15px;
  border-top: 1px solid #ddd;
`

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #4cae4c;
  }
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #5cb85c;
  }
  
  &::placeholder {
    color: #999;
  }
`

const FormButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const BackButton = styled.button`
  flex: 1;
  color: #6c757d;
  border: none;
  padding: 15px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`

const CartStyled = {
  Container,
  NavbarContainer,
  Content,
  ItemsSection,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemSpec,
  ItemPrice,
  QuantityControls,
  QuantityButton,
  QuantityInput,
  ItemTotal,
  RemoveButton,
  ContinueButton,
  SummarySection,
  SummaryHeader,
  SummaryRow,
  CouponSection,
  CouponInput,
  ApplyButton,
  CountrySelect,
  TotalRow,
  CheckoutButton,
  FormGroup,
  FormInput,
  FormButtonGroup,
  BackButton,
}

export default CartStyled