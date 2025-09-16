// credenciales del login
interface LoginCredentials {
    username: string
    password: string
}

interface AuthResponseRaw {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    image: string
    accessToken: string
    refreshToken: string
}

// respuesta de DummyJSON API
interface AuthResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    image: string
    accessToken: string
    refreshToken: string
}

// patron mapper
const mapAuthResponse = (rawResponse: AuthResponseRaw): AuthResponse => {
    return {
        id: rawResponse.id,
        username: rawResponse.username,
        email: rawResponse.email,
        firstName: rawResponse.firstName,
        lastName: rawResponse.lastName,
        image: rawResponse.image,
        accessToken: rawResponse.accessToken,
        refreshToken: rawResponse.refreshToken
    }
}

// autenticación con api DummyJSON
export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Login failed')
        }

        const rawData: AuthResponseRaw = await response.json()

        // aplicacion de mapper
        const mappedData: AuthResponse = mapAuthResponse(rawData)

        console.log('Raw API response:', rawData)
        console.log('Mapped response:', mappedData)

        // respuesta transformada
        return mappedData
    },

    requestPasswordReset: async (email: string): Promise<{success: boolean, message: string}> => {
        // validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if (!emailRegex.test(email)) {
            throw new Error('Por favor ingresa un email válido')
        }
        
        // delay de envío
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        return {
            success: true,
            message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
        }
    }
}