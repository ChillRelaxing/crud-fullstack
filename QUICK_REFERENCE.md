# ⚡ Comandos Rápidos - Referencia

## 🚀 Inicio Rápido (Primera Vez)

```powershell
# 1. Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev

# 2. Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

## 🔄 Desarrollo Diario

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📦 Backend Commands

### Gestión de Dependencias
```powershell
npm install                    # Instalar todas las dependencias
npm install <package>          # Agregar nueva dependencia
npm install -D <package>       # Agregar dependencia de desarrollo
```

### Desarrollo
```powershell
npm run dev                    # Iniciar servidor con hot-reload
npm run build                  # Compilar TypeScript
npm start                      # Iniciar servidor en producción
```

### Prisma
```powershell
npm run prisma:generate        # Generar cliente Prisma
npm run prisma:migrate         # Crear y aplicar migración
npm run prisma:studio          # Abrir GUI de base de datos
npm run seed                   # Poblar base de datos

# Comandos directos de Prisma
npx prisma migrate reset       # Resetear BD (¡CUIDADO!)
npx prisma migrate dev --name <nombre>  # Nueva migración
npx prisma db push             # Push schema sin migración
npx prisma format              # Formatear schema.prisma
```

## 🎨 Frontend Commands

### Gestión de Dependencias
```powershell
npm install                    # Instalar dependencias
npm install <package>          # Agregar nueva dependencia
```

### Desarrollo
```powershell
npm run dev                    # Iniciar dev server
npm run build                  # Build para producción
npm run preview                # Preview de producción
npm run lint                   # Ejecutar linter
```

## 🗄️ Database Commands (PostgreSQL)

### Windows (psql)
```powershell
# Conectar a PostgreSQL
psql -U postgres

# En psql:
\l                            # Listar bases de datos
\c crud_db                    # Conectar a crud_db
\dt                           # Listar tablas
\d "User"                     # Describir tabla User
\d "Post"                     # Describir tabla Post
\q                            # Salir

# Crear base de datos
createdb -U postgres crud_db

# Eliminar base de datos (¡CUIDADO!)
dropdb -U postgres crud_db
```

### Docker PostgreSQL
```powershell
# Iniciar PostgreSQL en Docker
docker run --name crud-postgres `
  -e POSTGRES_PASSWORD=postgres `
  -p 5432:5432 `
  -d postgres:14

# Detener contenedor
docker stop crud-postgres

# Iniciar contenedor existente
docker start crud-postgres

# Ver logs
docker logs crud-postgres

# Conectar a psql en container
docker exec -it crud-postgres psql -U postgres
```

## 🧪 Testing (Para implementar)

### Backend
```powershell
npm test                       # Ejecutar tests
npm test -- --watch           # Watch mode
npm test -- --coverage        # Con coverage
```

### Frontend
```powershell
npm test                       # Ejecutar tests
npm test -- --watch           # Watch mode
npm test -- --coverage        # Con coverage
```

## 🐛 Debugging

### Backend
```powershell
# Ver logs del servidor
# (ya incluidos en npm run dev)

# Verificar conexión a BD
npx prisma db pull             # Sincronizar desde BD
npx prisma validate            # Validar schema
```

### Frontend
```powershell
# Limpiar caché de Vite
rm -r node_modules/.vite

# Reinstalar dependencias
rm -r node_modules
npm install
```

## 📊 Prisma Studio

```powershell
# Abrir GUI para ver/editar datos
cd backend
npm run prisma:studio
# Se abre en http://localhost:5555
```

## 🧹 Limpieza

```powershell
# Limpiar backend
cd backend
rm -r node_modules
rm -r dist
npm install

# Limpiar frontend
cd frontend
rm -r node_modules
rm -r dist
npm install

# Resetear base de datos
cd backend
npx prisma migrate reset      # Elimina todo y recrea
npm run seed                  # Agrega datos de ejemplo
```

## 🔍 Verificación de Estado

```powershell
# Verificar que el backend esté corriendo
curl http://localhost:3000/api/health
# o
Invoke-RestMethod -Uri "http://localhost:3000/api/health"

# Ver usuarios
curl http://localhost:3000/api/users
# o
Invoke-RestMethod -Uri "http://localhost:3000/api/users"

# Ver posts
curl http://localhost:3000/api/posts
# o
Invoke-RestMethod -Uri "http://localhost:3000/api/posts"
```

## 🌐 URLs Importantes

```
Frontend:          http://localhost:5173
Backend API:       http://localhost:3000/api
Health Check:      http://localhost:3000/api/health
Prisma Studio:     http://localhost:5555
```

## 📝 Git Commands

```powershell
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit: CRUD app"

# Crear .gitignore (ya creado)
# node_modules/, dist/, .env, etc.

# Crear repositorio en GitHub y pushear
git remote add origin <url>
git branch -M main
git push -u origin main
```

## 🔧 Solución Rápida de Problemas

### Backend no inicia
```powershell
# 1. Verificar PostgreSQL
# 2. Verificar .env
# 3. Reinstalar dependencias
cd backend
rm -r node_modules
npm install
# 4. Regenerar Prisma
npm run prisma:generate
```

### Frontend no carga datos
```powershell
# 1. Verificar que backend esté corriendo
curl http://localhost:3000/api/health
# 2. Verificar CORS en backend
# 3. Ver consola del navegador (F12)
```

### Error de migración Prisma
```powershell
# Resetear y recrear
cd backend
npx prisma migrate reset
npm run prisma:migrate
npm run seed
```

### Puerto en uso
```powershell
# Backend (puerto 3000)
# Cambiar PORT en .env

# Frontend (puerto 5173)
# Cambiar en vite.config.ts
# o Vite asignará automáticamente otro puerto
```

## 📦 Scripts Personalizados

### Script para reiniciar todo
```powershell
# backend/reset.ps1
cd backend
npx prisma migrate reset --force
npm run seed
npm run dev
```

### Script de producción
```powershell
# backend/deploy.ps1
cd backend
npm install --production
npm run prisma:generate
npm run build
npm start
```

## 🎯 Workflows Comunes

### Agregar nuevo campo a User
```powershell
# 1. Editar backend/prisma/schema.prisma
# 2. Crear migración
cd backend
npx prisma migrate dev --name add_user_field
# 3. Los tipos se actualizan automáticamente
# 4. Actualizar controladores si es necesario
# 5. Actualizar frontend types e interfaces
```

### Agregar nueva tabla
```powershell
# 1. Agregar model en schema.prisma
# 2. Crear migración
npx prisma migrate dev --name add_new_table
# 3. Crear controller
# 4. Crear routes
# 5. Agregar routes a index.ts
# 6. Crear componentes en frontend
```

---

**💡 Tip:** Guarda este archivo como referencia rápida durante el desarrollo.
