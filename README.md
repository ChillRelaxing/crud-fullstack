# 🚀 CRUD Full Stack Application

Aplicación CRUD completa con dos tablas relacionadas (Usuarios y Posts) utilizando las tecnologías más modernas.

> 📚 **[Ver Índice de Documentación Completa](INDEX.md)** | 🚀 **[Guía de Inicio Rápido](GETTING_STARTED.md)** | 🏗️ **[Arquitectura](ARCHITECTURE.md)**

## 📋 Tecnologías Utilizadas

### Backend
- **Node.js** con **Express** - Framework web rápido y minimalista
- **TypeScript** - JavaScript con tipado estático
- **Prisma ORM** - ORM moderno para Node.js y TypeScript
- **PostgreSQL** - Base de datos relacional

### Frontend
- **React 18** - Librería UI moderna
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **TailwindCSS** - Framework CSS utility-first
- **React Query** (@tanstack/react-query) - Manejo de estado del servidor
- **Axios** - Cliente HTTP

## 🏗️ Estructura del Proyecto

```
CRUD/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Esquema de base de datos
│   ├── src/
│   │   ├── controllers/         # Controladores CRUD
│   │   │   ├── userController.ts
│   │   │   └── postController.ts
│   │   ├── routes/              # Rutas de la API
│   │   │   ├── userRoutes.ts
│   │   │   └── postRoutes.ts
│   │   ├── db.ts                # Cliente Prisma
│   │   └── index.ts             # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/          # Componentes React
    │   │   ├── UserList.tsx
    │   │   ├── UserForm.tsx
    │   │   ├── PostList.tsx
    │   │   └── PostForm.tsx
    │   ├── services/            # API calls
    │   │   └── api.ts
    │   ├── types/               # TypeScript types
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── index.html
```

## ⚙️ Requisitos Previos

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** o **yarn**

## 🚀 Instalación y Configuración

### 1. Configurar PostgreSQL

Primero, asegúrate de tener PostgreSQL instalado y en ejecución.

Crea una base de datos:

```sql
CREATE DATABASE crud_db;
```

### 2. Backend

```powershell
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env y configura tu DATABASE_URL
# Ejemplo: DATABASE_URL="postgresql://postgres:password@localhost:5432/crud_db?schema=public"

# Generar el cliente Prisma
npm run prisma:generate

# Ejecutar migraciones (crear tablas)
npm run prisma:migrate

# Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`

### 3. Frontend

En una nueva terminal:

```powershell
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## 📡 API Endpoints

### Usuarios

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario por ID
- `POST /api/users` - Crear un nuevo usuario
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
  ```
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario

### Posts

- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener un post por ID
- `GET /api/posts/user/:userId` - Obtener posts de un usuario
- `POST /api/posts` - Crear un nuevo post
  ```json
  {
    "title": "Mi primer post",
    "content": "Contenido del post",
    "published": true,
    "authorId": 1
  }
  ```
- `PUT /api/posts/:id` - Actualizar un post
- `DELETE /api/posts/:id` - Eliminar un post

## 🎯 Características Implementadas

### ✅ Funcionalidades CRUD Completas

- **Create** (Crear): Formularios para crear usuarios y posts
- **Read** (Leer): Listado de usuarios y posts con toda su información
- **Update** (Actualizar): Edición inline de registros existentes
- **Delete** (Eliminar): Eliminación con confirmación

### 🔗 Relaciones entre Tablas

- Un usuario puede tener múltiples posts (relación 1:N)
- Los posts están vinculados a un autor (usuario)
- Eliminación en cascada: al eliminar un usuario, se eliminan sus posts

### 🎨 Interfaz de Usuario

- Diseño moderno y responsivo con TailwindCSS
- Tabs para navegar entre usuarios y posts
- Feedback visual para operaciones (loading, success, error)
- Formularios de edición inline
- Confirmaciones para operaciones destructivas

### 🔧 Características Técnicas

- **TypeScript** en todo el stack para type safety
- **React Query** para manejo eficiente de caché y estado del servidor
- **Prisma** para consultas type-safe a la base de datos
- **Validaciones** en backend y frontend
- **Manejo de errores** robusto
- **CORS** configurado para desarrollo

## 🛠️ Scripts Disponibles

### Backend

```powershell
npm run dev          # Inicia el servidor en modo desarrollo con hot-reload
npm run build        # Compila TypeScript a JavaScript
npm run start        # Inicia el servidor en producción
npm run prisma:generate  # Genera el cliente Prisma
npm run prisma:migrate   # Ejecuta migraciones de base de datos
npm run prisma:studio    # Abre Prisma Studio (GUI para ver datos)
```

### Frontend

```powershell
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción
```

## 📝 Próximos Pasos Sugeridos

- [ ] Implementar autenticación y autorización
- [ ] Agregar paginación a las listas
- [ ] Implementar búsqueda y filtros
- [ ] Agregar validaciones más robustas
- [ ] Implementar testing (Jest, React Testing Library)
- [ ] Dockerizar la aplicación
- [ ] Agregar CI/CD
- [ ] Implementar rate limiting
- [ ] Agregar logs con Winston/Pino

## 📚 Documentación Adicional

Este proyecto incluye documentación exhaustiva:

- **[📖 Índice de Documentación](INDEX.md)** - Tabla de contenidos completa
- **[🚀 Guía de Inicio Rápido](GETTING_STARTED.md)** - Setup paso a paso
- **[🏗️ Arquitectura](ARCHITECTURE.md)** - Diseño y patrones del sistema
- **[📡 Ejemplos de API](API_EXAMPLES.md)** - Todos los endpoints con ejemplos
- **[⚡ Referencia Rápida](QUICK_REFERENCE.md)** - Comandos útiles
- **[📊 Resumen del Proyecto](PROJECT_SUMMARY.md)** - Visión general completa
- **[🚀 Despliegue](DEPLOYMENT.md)** - Guía para producción

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

---

**¡Disfruta construyendo con este stack moderno!** 🎉

> 💡 **Tip:** Empieza por [GETTING_STARTED.md](GETTING_STARTED.md) si es tu primera vez con el proyecto.
