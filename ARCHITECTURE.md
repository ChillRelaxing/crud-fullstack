# 🏛️ Arquitectura del Proyecto

## 📊 Diagrama de la Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                     http://localhost:5173                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  UserList    │  │  UserForm    │  │  PostList    │  ...     │
│  │  Component   │  │  Component   │  │  Component   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                      │
│                  ┌────────▼────────┐                            │
│                  │  React Query    │                            │
│                  │  (State Mgmt)   │                            │
│                  └────────┬────────┘                            │
│                           │                                      │
│                  ┌────────▼────────┐                            │
│                  │  Axios Client   │                            │
│                  │  (HTTP)         │                            │
│                  └────────┬────────┘                            │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                   HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND (Express)                           │
│                     http://localhost:3000                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    Express Router                       │    │
│  │  /api/users  |  /api/posts                            │    │
│  └────────┬──────────────┬──────────────────────────────┘    │
│           │              │                                     │
│  ┌────────▼──────┐  ┌───▼────────────┐                      │
│  │ User          │  │ Post           │                       │
│  │ Controller    │  │ Controller     │                       │
│  └────────┬──────┘  └───┬────────────┘                      │
│           │              │                                     │
│           └──────┬───────┘                                     │
│                  │                                             │
│         ┌────────▼────────┐                                   │
│         │ Prisma Client   │                                   │
│         └────────┬────────┘                                   │
└──────────────────┼─────────────────────────────────────────────┘
                   │
              SQL Queries
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│                      PostgreSQL Database                         │
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │   User Table     │         │   Post Table     │             │
│  ├──────────────────┤         ├──────────────────┤             │
│  │ id (PK)         │         │ id (PK)         │             │
│  │ email (UNIQUE)  │◄────────│ authorId (FK)   │             │
│  │ name            │    1:N  │ title           │             │
│  │ createdAt       │         │ content         │             │
│  │ updatedAt       │         │ published       │             │
│  └──────────────────┘         │ createdAt       │             │
│                                │ updatedAt       │             │
│                                └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos

### Ejemplo: Crear un Usuario

1. **Frontend**: Usuario llena el formulario en `UserForm`
2. **React**: `handleSubmit()` se ejecuta
3. **React Query**: `useMutation` envía la petición
4. **Axios**: POST request a `http://localhost:3000/api/users`
5. **Backend**: Express recibe la petición en `/api/users` (POST)
6. **Router**: Dirige a `userRoutes.ts`
7. **Controller**: `createUser()` en `userController.ts` se ejecuta
8. **Prisma**: `prisma.user.create()` genera SQL
9. **PostgreSQL**: Inserta el registro en la tabla `User`
10. **Response**: El usuario creado regresa por el mismo camino
11. **React Query**: Invalida la caché y refetch automático
12. **UI**: La lista de usuarios se actualiza automáticamente

## 🏗️ Patrones de Diseño Utilizados

### Backend

#### 1. **MVC (Model-View-Controller)** - Adaptado
- **Model**: Prisma Schema define los modelos
- **Controller**: Controladores manejan la lógica de negocio
- **Routes**: Definen los endpoints y conectan con controladores

#### 2. **Repository Pattern** - Vía Prisma
- Prisma actúa como capa de abstracción sobre la base de datos
- Separación entre lógica de negocio y acceso a datos

#### 3. **RESTful API**
- Endpoints semánticos
- Verbos HTTP apropiados (GET, POST, PUT, DELETE)
- Códigos de estado HTTP correctos

### Frontend

#### 1. **Component-Based Architecture**
- Componentes reutilizables y modulares
- Separación de responsabilidades (List/Form)

#### 2. **Server State Management**
- React Query maneja el estado del servidor
- Caché automático y sincronización

#### 3. **Service Layer**
- `api.ts` encapsula todas las llamadas HTTP
- Centralización de la configuración de Axios

## 📦 Estructura de Carpetas Explicada

### Backend

```
backend/
├── prisma/
│   ├── schema.prisma      # Define modelos y relaciones
│   └── seed.ts           # Datos iniciales para desarrollo
├── src/
│   ├── controllers/      # Lógica de negocio
│   │   ├── userController.ts
│   │   └── postController.ts
│   ├── routes/           # Definición de endpoints
│   │   ├── userRoutes.ts
│   │   └── postRoutes.ts
│   ├── db.ts            # Cliente Prisma singleton
│   └── index.ts         # Entry point, configuración Express
├── .env                 # Variables de entorno
├── package.json         # Dependencias y scripts
└── tsconfig.json        # Configuración TypeScript
```

### Frontend

```
frontend/
├── src/
│   ├── components/       # Componentes React
│   │   ├── UserList.tsx  # Lista y acciones de usuarios
│   │   ├── UserForm.tsx  # Formulario de usuarios
│   │   ├── PostList.tsx  # Lista y acciones de posts
│   │   └── PostForm.tsx  # Formulario de posts
│   ├── services/         # Servicios API
│   │   └── api.ts        # Cliente Axios y endpoints
│   ├── types/            # TypeScript types
│   │   └── index.ts      # Interfaces compartidas
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point, setup React Query
│   └── index.css         # Estilos globales con Tailwind
├── index.html            # HTML template
├── package.json          # Dependencias y scripts
├── vite.config.ts        # Configuración Vite
├── tailwind.config.js    # Configuración Tailwind
└── tsconfig.json         # Configuración TypeScript
```

## 🔐 Consideraciones de Seguridad (Para Producción)

### Backend
- [ ] Implementar autenticación (JWT, OAuth)
- [ ] Validación de inputs con librerías como Zod o Joi
- [ ] Rate limiting con express-rate-limit
- [ ] Helmet.js para headers de seguridad
- [ ] Sanitización de datos
- [ ] HTTPS en producción

### Frontend
- [ ] Almacenamiento seguro de tokens
- [ ] Sanitización de inputs
- [ ] HTTPS en producción
- [ ] CSP (Content Security Policy)

## 📈 Escalabilidad

### Backend
- [ ] Implementar caché con Redis
- [ ] Paginación en queries
- [ ] Indexación de base de datos
- [ ] Load balancing
- [ ] Logs estructurados
- [ ] Monitoreo (APM)

### Frontend
- [ ] Code splitting con React.lazy
- [ ] Lazy loading de componentes
- [ ] Optimización de imágenes
- [ ] CDN para assets estáticos
- [ ] Service Workers para PWA

## 🧪 Testing

### Backend
```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### Frontend
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🐳 Docker (Opcional)

Para containerizar la aplicación:

```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
RUN npm run build
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: crud_db
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/crud_db
    ports:
      - "3000:3000"
  
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

---

Esta arquitectura proporciona una base sólida para construir aplicaciones escalables y mantenibles. 🚀
