import { useState, useEffect } from 'react'
import "./App.css"
// import MyAppStyled from './App.styled'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'


function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      
    </div>
    // <>
    //   <h1>pruebas</h1>
    //   <MyAppStyled.Botoncito>Click me</MyAppStyled.Botoncito>
    // </>
  )
}

export default App
