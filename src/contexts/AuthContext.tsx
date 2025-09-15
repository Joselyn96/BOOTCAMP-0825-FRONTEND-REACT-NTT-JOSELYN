import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

//datos del usuario
interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
}

// tipo del contexto
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  login: (userData: User, accessToken: string, refreshToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// props del provider
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // revisar si hay datos en localStorage al cargarr
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedUserData = localStorage.getItem('userData')

    if (storedToken && storedUserData) {
      try {
        const userData: User = JSON.parse(storedUserData)
        setUser(userData)
        setAccessToken(storedToken)
        setIsAuthenticated(true)
        
        console.log('Usuario autenticado desde localStorage:', userData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        // eliminar localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userData')
      }
    }
  }, [])

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    // guardar en estado
    setUser(userData)
    setAccessToken(accessToken)
    setIsAuthenticated(true)

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userData', JSON.stringify(userData))

    console.log('Usuario logueado:', userData)
  }

  // para el logout
  const logout = () => {
    // elimina estado
    setUser(null)
    setAccessToken(null)
    setIsAuthenticated(false)

    // eliminar localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userData')

    console.log('Usuario deslogueado')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    accessToken,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// hook para el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}