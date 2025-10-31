// components/layout/Footer.styled.js
import styled from 'styled-components'

const Container = styled.footer`
  background-color: #22c55e;
  color: #f9fafb;
  padding: 3rem 1rem 1rem;
  
  @media (min-width: 1024px) {
    padding: 4rem 3rem 1.5rem;
  }
`

const Content = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const LogoText = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f9fafb;
`

const Description = styled.p`
  color: #f9fafb;
  font-size: 0.875rem;
  line-height: 1.5;
`

const SectionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f9fafb;
`

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const LinkItem = styled.li``

const Link = styled.a`
  color: #f9fafb;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f9fafb;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialLink = styled.a`
  color: #f9fafb;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f9fafb;
  }
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const Bottom = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Copyright = styled.p`
  color: #f9fafb;
  font-size: 0.875rem;
  margin: 0;
`

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
`

const FooterStyled = {
  Container,
  Content,
  Section,
  Logo,
  LogoText,
  Description,
  SectionTitle,
  LinkList,
  LinkItem,
  Link,
  SocialLinks,
  SocialLink,
  Bottom,
  Copyright,
  LegalLinks,
}

export default FooterStyled