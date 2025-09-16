# BOOTCAMP-0825-FRONTEND-REACT-NTT-JOSELYN

# dummyStore

Una tienda virtual construida con **React 19.1.1**, **TypeScript** y **Vite**, que utiliza la API pública de [dummyjson](https://dummyjson.com/) para manejar **autenticación de usuarios, productos y categorías**.  
---

## Características

- **Tecnología Moderna:** React 19.1.1 + Vite + TypeScript  
- **Validación de Formularios:** Validaciones en cliente con mensajes de error dinámicos  
- **Diseño Responsivo:** Enfoque mobile-first con Styled Components  
- **Autenticación:** Login mediante API dummyjson  
- **Gestión de Estado:** Context API y custom hooks  
- **Carrito de Compras:** Agregar, quitar y actualizar productos en tiempo real  
- **Arquitectura de Componentes:** Modular, separada por funcionalidades  
- **Pruebas Fáciles:** Estructura lista para incluir test unitarios  

---

## Tecnologías

- **Framework:** React 19.1.1  
- **Lenguaje:** TypeScript  
- **Build Tool:** Vite  
- **Estilos:** Styled Components (CSS-in-JS)  
- **Gestión de Estado:** Context API  
---

## Instalación y Configuración

### Prerrequisitos

- **Node.js**: v20.18.1 o superior  
- **npm**: v10.8.2 o superior (o yarn)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone al repositorio
2. Moverse a la rama feature/proyecto-Integrador
3. Instalar dependencias: npm install
4. Iniciar el servidor de desarrollo: npm run dev
### Usuarios de prueba
 username: emilys
 password: emilyspass
### Arquitectura del Proyecto

```plaintext
src/
├── components/           # Reusable UI components
│   ├── Avatar/
│   │   ├── Avatar.jsx
│   │   └── Avatar.test.js
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.test.js
│   └── TextField/
│       ├── TextField.jsx
│       └── TextField.test.js
├── contexts/            # React Context providers
│   └── UserContext/
│       └── UserContext.js
├── hooks/              # Custom React hooks
│   └── useMediaQuery/
│       └── useMediaQuery.js
├── pages/              # Application pages/screens
│   ├── UserProfile/
│   │   ├── components/     # Page-specific components
│   │   │   └── SomeUserProfileComponent/
│   │   │       ├── SomeUserProfileComponent.jsx
│   │   │       └── SomeUserProfileComponent.test.js
│   │   ├── UserProfile.jsx
│   │   └── UserProfile.test.js
│   └── index.js
├── routes/             # Application routing
│   ├── routes.jsx
│   └── routes.test.js
├── utils/              # Utility functions
│   └── some-util/
│       ├── index.js
│       ├── someUtil.js
│       └── index.test.js
├── services/           # API services and external integrations
│   └── some-service/
│       ├── index.js
│       ├── someService.js
│       └── index.test.js
├── App.jsx            # Main application component
└── index.js           # Application entry point
