import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    // mock date para tener control sobre el año
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deberia renderizar el logo y descripción correctamente', () => {
    render(<Footer />)
    
    expect(screen.getByText('dummyStore')).toBeInTheDocument()
    expect(screen.getByText('Making shopping easier and more convenient for everyone.')).toBeInTheDocument()
  })

  it('deberia mostrar la sección de Quick Links con todos los enlaces', () => {
    render(<Footer />)
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Benefits')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('deberia mostrar la sección de Support con todos los enlaces', () => {
    render(<Footer />)
    
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Help Center')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('Shipping Info')).toBeInTheDocument()
    expect(screen.getByText('Returns')).toBeInTheDocument()
  })

  it('deberia mostrar la sección de redes sociales', () => {
    render(<Footer />)
    
    expect(screen.getByText('Follow Us')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
  })

  it('deberia mostrar el copyright con el año actual', () => {
    render(<Footer />)
    
    expect(screen.getByText('© 2024 dummyStore. All rights reserved.')).toBeInTheDocument()
  })

  it('deberia mostrar los enlaces legales en el bottom', () => {
    render(<Footer />)
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('deberia tener los enlaces con los href correctos', () => {
    render(<Footer />)
    
    // Quick Links
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#home')
    expect(screen.getByText('Categories').closest('a')).toHaveAttribute('href', '#categories')
    expect(screen.getByText('Benefits').closest('a')).toHaveAttribute('href', '#benefits')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    
    // Support Links
    expect(screen.getByText('Help Center').closest('a')).toHaveAttribute('href', '#help')
    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute('href', '#contact')
    expect(screen.getByText('Shipping Info').closest('a')).toHaveAttribute('href', '#shipping')
    expect(screen.getByText('Returns').closest('a')).toHaveAttribute('href', '#returns')
  })

  it('deberia tener los enlaces sociales con arialabel correctos', () => {
    render(<Footer />)
    
    const facebookLink = screen.getByLabelText('Facebook')
    const twitterLink = screen.getByLabelText('Twitter')
    const instagramLink = screen.getByLabelText('Instagram')
    
    expect(facebookLink).toHaveAttribute('href', '#facebook')
    expect(twitterLink).toHaveAttribute('href', '#twitter')
    expect(instagramLink).toHaveAttribute('href', '#instagram')
  })

  it('deberia tener los enlaces legales con href correctos', () => {
    render(<Footer />)
    
    expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute('href', '#privacy')
    expect(screen.getByText('Terms of Service').closest('a')).toHaveAttribute('href', '#terms')
  })

  it('deberia renderizar los SVG de redes sociales', () => {
    const { container } = render(<Footer />)
    
    const svgElements = container.querySelectorAll('svg')
    expect(svgElements).toHaveLength(3)
    
    svgElements.forEach(svg => {
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })
  })

  it('deberia calcular el año dinamicamente', () => {
    // test con año diferente
    vi.setSystemTime(new Date('2025-06-15'))
    render(<Footer />)
    
    expect(screen.getByText('© 2025 dummyStore. All rights reserved.')).toBeInTheDocument()
  })
})