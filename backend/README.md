# Backend - CRUD API

Backend RESTful API construido con Node.js, Express, TypeScript y Prisma ORM.

## 🚀 Inicio Rápido

```powershell
# Instalar dependencias
npm install

# Configurar .env (ver .env.example)
cp .env.example .env

# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Iniciar servidor
npm run dev
```

## 📦 Dependencias

- **express** - Framework web
- **@prisma/client** - Cliente ORM
- **cors** - Middleware CORS
- **dotenv** - Variables de entorno
- **typescript** - Lenguaje
- **ts-node** - Ejecutor TypeScript
- **nodemon** - Hot reload

## 🗄️ Base de Datos

El esquema de Prisma define dos modelos:

- **User**: Usuarios del sistema
- **Post**: Posts creados por usuarios

Relación: Un usuario puede tener múltiples posts.

## 🔌 Endpoints

Ver el README principal para la documentación completa de la API.

## 🛠️ Prisma Studio

Para explorar y editar datos visualmente:

```powershell
npm run prisma:studio
```

Esto abrirá una interfaz web en `http://localhost:5555`
