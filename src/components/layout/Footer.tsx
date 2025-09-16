// components/layout/Footer.js
import FooterStyled from './Footer.styled'

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <FooterStyled.Container>
      <FooterStyled.Content>
        <FooterStyled.Section>
          <FooterStyled.Logo>
            <FooterStyled.LogoText>dummyStore</FooterStyled.LogoText>
          </FooterStyled.Logo>
          <FooterStyled.Description>
            Making shopping easier and more convenient for everyone.
          </FooterStyled.Description>
        </FooterStyled.Section>

        <FooterStyled.Section>
          <FooterStyled.SectionTitle>Quick Links</FooterStyled.SectionTitle>
          <FooterStyled.LinkList>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#home">Home</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#categories">Categories</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#benefits">Benefits</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#about">About</FooterStyled.Link>
            </FooterStyled.LinkItem>
          </FooterStyled.LinkList>
        </FooterStyled.Section>

        <FooterStyled.Section>
          <FooterStyled.SectionTitle>Support</FooterStyled.SectionTitle>
          <FooterStyled.LinkList>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#help">Help Center</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#contact">Contact Us</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#shipping">Shipping Info</FooterStyled.Link>
            </FooterStyled.LinkItem>
            <FooterStyled.LinkItem>
              <FooterStyled.Link href="#returns">Returns</FooterStyled.Link>
            </FooterStyled.LinkItem>
          </FooterStyled.LinkList>
        </FooterStyled.Section>

        <FooterStyled.Section>
          <FooterStyled.SectionTitle>Follow Us</FooterStyled.SectionTitle>
          <FooterStyled.SocialLinks>
            <FooterStyled.SocialLink href="#facebook" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </FooterStyled.SocialLink>
            <FooterStyled.SocialLink href="#twitter" aria-label="Twitter">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </FooterStyled.SocialLink>
            <FooterStyled.SocialLink href="#instagram" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.243 0-4.062-1.819-4.062-4.062s1.819-4.062 4.062-4.062 4.062 1.819 4.062 4.062-1.819 4.062-4.062 4.062zm7.138 0c-2.243 0-4.062-1.819-4.062-4.062s1.819-4.062 4.062-4.062 4.062 1.819 4.062 4.062-1.819 4.062-4.062 4.062z"/>
              </svg>
            </FooterStyled.SocialLink>
          </FooterStyled.SocialLinks>
        </FooterStyled.Section>
      </FooterStyled.Content>

      <FooterStyled.Bottom>
        <FooterStyled.Copyright>
          © {currentYear} dummyStore. All rights reserved.
        </FooterStyled.Copyright>
        <FooterStyled.LegalLinks>
          <FooterStyled.Link href="#privacy">Privacy Policy</FooterStyled.Link>
          <FooterStyled.Link href="#terms">Terms of Service</FooterStyled.Link>
        </FooterStyled.LegalLinks>
      </FooterStyled.Bottom>
    </FooterStyled.Container>
  )
}

export default Footer