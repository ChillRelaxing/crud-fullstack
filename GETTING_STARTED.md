# GUÍA DE INICIO RÁPIDO

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (v18 o superior)
   - Descarga desde: https://nodejs.org/

2. **PostgreSQL** (v14 o superior)
   - Windows: https://www.postgresql.org/download/windows/
   - Alternativamente, usa Docker:
     ```powershell
     docker run --name crud-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
     ```

## 🚀 Pasos de Instalación

### 1️⃣ Configurar Base de Datos

Abre pgAdmin o usa psql:

```sql
CREATE DATABASE crud_db;
```

### 2️⃣ Configurar Backend

```powershell
# Navegar al backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita .env y actualiza la URL de tu base de datos:
# DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/crud_db"

# Generar cliente Prisma
npm run prisma:generate

# Crear tablas en la base de datos
npm run prisma:migrate

# (Opcional) Poblar la base de datos con datos de ejemplo
npx ts-node prisma/seed.ts

# Iniciar el servidor
npm run dev
```

✅ El backend ahora está corriendo en `http://localhost:3000`

### 3️⃣ Configurar Frontend

Abre una nueva terminal:

```powershell
# Navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

✅ El frontend ahora está corriendo en `http://localhost:5173`

### 4️⃣ Probar la Aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Verás la interfaz con dos pestañas: **Usuarios** y **Posts**
3. Prueba crear, editar y eliminar registros

## 🔍 Verificar que Todo Funciona

### Backend
- Visita: `http://localhost:3000/api/health`
- Deberías ver: `{"status":"OK","message":"Server is running"}`

### Frontend
- Visita: `http://localhost:5173`
- Deberías ver la interfaz de la aplicación

### Base de Datos (Opcional)
```powershell
cd backend
npm run prisma:studio
```
- Se abrirá en `http://localhost:5555`
- Podrás ver y editar datos directamente

## ❗ Solución de Problemas

### Error: No se puede conectar a PostgreSQL

```powershell
# Verifica que PostgreSQL esté corriendo
# En Windows, busca "Services" y verifica que PostgreSQL esté activo
```

### Error: Port 3000 already in use

```powershell
# Cambia el puerto en backend/.env
PORT=3001
```

### Error: Module not found

```powershell
# Asegúrate de haber instalado las dependencias
npm install
```

### Error de CORS en el frontend

Verifica que el backend esté corriendo en el puerto 3000 y que CORS esté habilitado.

## 📚 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de React Query](https://tanstack.com/query/latest)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
- [Documentación de Express](https://expressjs.com/)

## 🎯 Próximos Pasos

Una vez que todo esté funcionando:

1. Explora el código en `backend/src/controllers`
2. Revisa los componentes de React en `frontend/src/components`
3. Experimenta modificando el esquema en `backend/prisma/schema.prisma`
4. Personaliza los estilos con TailwindCSS

¡Disfruta construyendo! 🎉
