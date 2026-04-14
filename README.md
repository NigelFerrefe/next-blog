# 📝 Auth Blog - Frontend

Una aplicación de blog moderna y completa construida con **Next.js 16**, **React 19** y **TypeScript**. Diseñada con autenticación robusta, gestión de contenido avanzada y una experiencia de usuario optimizada.

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- Inicio de sesión y registro de usuarios
- Autenticación OTP (One-Time Password)
- Recuperación de contraseña
- Activación de cuenta por email
- Gestión de perfiles de usuario
- Perfiles públicos de autores

### 📚 Gestión de Blog
- **Crear, editar y eliminar posts** con editor de texto enriquecido (TipTap)
- **Categorización** de posts
- **Sistema de gustos (likes)** en posts
- **Búsqueda y filtrado** de contenido
- **Paginación** de posts
- **Thumbnails y imágenes** optimizadas con Google Cloud Storage

### 🎨 Experiencia de Usuario
- Diseño responsivo con **Tailwind CSS**
- Tema oscuro/claro con `next-themes`
- Componentes reutilizables y bien estructurados
- Validación de formularios con `React Hook Form` y `Zod`
- Notificaciones elegantes con `react-toastify`
- Carga progresiva con skeletons y loaders

### ⚡ Rendimiento y Desarrollo
- **Next.js 16** con Turbopack
- **React 19** con mejoras de performance
- **React Query** para gestión de datos
- **Redux Toolkit** para estado global
- **TypeScript** para type safety
- Optimización de imágenes automática

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 16.2.1
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4 + PostCSS
- **Lenguaje:** TypeScript 5

### Estado y Datos
- **State Management:** Redux Toolkit + React Redux
- **Server State:** TanStack React Query
- **Persistencia:** Redux Persist
- **Validación:** Zod

### Formularios y Edición
- **Formularios:** React Hook Form
- **Editor de Texto:** TipTap (con Starter Kit)
- **Validación:** @hookform/resolvers
- **Selección de archivos:** react-dropzone

### Integración y APIs
- **HTTP Client:** Axios
- **Cloud Storage:** Google Cloud Storage
- **Sanitización:** isomorphic-dompurify

### UI y Experiencia
- **Componentes:** Headless UI
- **Iconos:** Lucide React + React Icons
- **Notificaciones:** React Toastify
- **Calendario:** React DatePicker
- **Spinner:** React Spinners
- **Progress:** rc-progress
- **Temas:** next-themes

### Desarrollo
- **Linting:** ESLint 9
- **Formateo:** Prettier + Tailwind CSS Plugin
- **Type Checking:** TypeScript

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ o superior
- npm, yarn, pnpm o bun
- Backend API en ejecución
- Credenciales de Google Cloud Storage

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd frontend

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```


### Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. La aplicación se recargará automáticamente al editar archivos.

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo

# Producción
npm run build         # Construye la aplicación para producción
npm start             # Inicia servidor de producción

# Calidad del código
npm run lint          # Ejecuta ESLint
npm run format        # Formatea código con Prettier
```

## 🏗️ Arquitectura

### Flujo de Autenticación
1. Usuario se registra o inicia sesión
2. Backend valida credenciales y retorna token JWT
3. Token se almacena en Redux + Redux Persist
4. Se incluye en headers de todas las peticiones API

### Gestión de Estado
- **Redux:** Estado global (autenticación, usuario)
- **React Query:** Caché de datos del servidor (posts, comentarios)
- **Redux Persist:** Persistencia de estado en localStorage

### Llamadas a API
- Cliente en `lib/api/api.client.ts` para lado del cliente
- Cliente en `lib/api/api.server.ts` para Server Components
- Interceptores para manejo de tokens y errores

### Validación
- Esquemas Zod en `/schemas`
- Validación en formularios con React Hook Form
- Validación en API routes


## 🔒 Seguridad

- ✅ TypeScript para type safety
- ✅ Validación con Zod
- ✅ Sanitización de HTML con isomorphic-dompurify
- ✅ CORS configurado en backend
- ✅ JWT para autenticación
- ✅ Variables de entorno para secretos
- ✅ CSP headers recomendados



## 🌓 Tema Oscuro/Claro

Implementado con `next-themes`:
- Tema persistente en localStorage
- Botón para cambiar tema
- Sincronización entre pestañas
- Estilos con Tailwind dark mode

## 📝 Estándares de Código

- **TypeScript:** Tipos explícitos
- **Prettier:** Formateo automático
- **ESLint:** Linting con Next.js rules
- **Tailwind:** Clases CSS consistentes
- **Componentes:** Basados en funciones (no clases)


## 👨‍💻 Autor

Desarrollado por Nigel Ferreres como proyecto educativo para Udemy Django REST.

---


