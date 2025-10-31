import "./App.css"
import { AuthProvider } from "./contexts/AuthContext"
import AppRoutes from "./routes/Index"

function App() {

  return (
    // <>
    //   <h1>pruebas</h1>
    //   <MyAppStyled.Botoncito>Click me</MyAppStyled.Botoncito>
    // </>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
