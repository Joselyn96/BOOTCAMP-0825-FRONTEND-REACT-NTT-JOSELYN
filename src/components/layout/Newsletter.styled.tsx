import styled from 'styled-components'

const Container = styled.section`
  padding: 3rem 0;
  background-color: #ffffffff;

  @media (min-width: 640px) {
    padding: 4rem 0;
  }
`

const ContainerInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Content = styled.div`
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border-radius: 1rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 3rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem;
  }
`

const TextSection = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 24rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 0;
  }
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const Button = styled.button`
  padding: 0.75rem 2rem;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #16a34a;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`

const ProductImage = styled.img`
  width: auto;
  height: 120px;
  object-fit: contain;

  @media (min-width: 640px) {
    height: 150px;
  }

  @media (min-width: 1024px) {
    height: 180px;
  }
`

const NewsletterStyled = {
  Container,
  ContainerInner,
  Content,
  TextSection,
  Title,
  Subtitle,
  Form,
  Input,
  Button,
  ImageSection,
  ProductImage,
}

export default NewsletterStyled