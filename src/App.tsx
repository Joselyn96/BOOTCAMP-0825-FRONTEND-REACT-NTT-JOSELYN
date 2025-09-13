import { useState} from 'react'
import "./App.css"
// import MyAppStyled from './App.styled'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Hero from './components/layout/Hero'
import Benefits from './components/layout/Benefits'
import Categories from './components/layout/Categories'
import Carousel from './components/layout/Carousel'
import Newsletter from './components/layout/Newsletter'
import Testimonial from './components/layout/Testimonial'

//hooks
import { useScroll } from './hooks/useScroll'

function App() {
  const isScrolled = useScroll(50)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }


  return (
    <div className="min-h-screen">
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Navbar isScrolled={isScrolled} onToggleSidebar={toggleSidebar} />
      <Hero />
      <Benefits />
      <Categories />
      <Carousel />
      <Newsletter />
      <Testimonial />
    </div>
    // <>
    //   <h1>pruebas</h1>
    //   <MyAppStyled.Botoncito>Click me</MyAppStyled.Botoncito>
    // </>
  )
}

export default App
