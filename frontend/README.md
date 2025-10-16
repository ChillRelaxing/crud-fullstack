# Frontend - CRUD Application

Frontend construido con React, TypeScript, Vite y TailwindCSS.

## 🚀 Inicio Rápido

```powershell
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Dependencias

- **react** & **react-dom** - Librería UI
- **@tanstack/react-query** - Manejo de estado del servidor
- **axios** - Cliente HTTP
- **typescript** - Lenguaje
- **vite** - Build tool
- **tailwindcss** - Framework CSS

## 🎨 Componentes

### UserList
Lista todos los usuarios con opciones para editar y eliminar.

### UserForm
Formulario para crear y editar usuarios.

### PostList
Lista todos los posts con información del autor.

### PostForm
Formulario para crear y editar posts.

## 🔧 Configuración

### API URL

El frontend está configurado para conectarse a `http://localhost:3000/api`

Si necesitas cambiar esto, edita `src/services/api.ts`:

```typescript
const API_URL = 'http://localhost:3000/api';
```

## 🎯 Características

- ✅ UI responsiva y moderna
- ✅ Validación de formularios
- ✅ Manejo de estados de carga
- ✅ Manejo de errores
- ✅ Actualización automática de datos
- ✅ Confirmaciones para eliminaciones

## 🏗️ Build para Producción

```powershell
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`
