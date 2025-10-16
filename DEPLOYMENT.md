# 🚀 Guía de Despliegue a Producción

Esta guía cubre diferentes opciones para desplegar tu aplicación CRUD en producción.

## 📋 Preparación Pre-Despliegue

### Checklist
- [ ] Todas las pruebas pasan
- [ ] Variables de entorno configuradas
- [ ] Base de datos de producción lista
- [ ] Código en repositorio Git
- [ ] .gitignore correctamente configurado
- [ ] README.md actualizado
- [ ] Dependencias auditadas (`npm audit`)

## 🌐 Opciones de Hosting

### Backend

#### 1. Railway.app (Recomendado - Fácil)

**Características:**
- ✅ PostgreSQL incluido
- ✅ Deploy automático desde GitHub
- ✅ Plan gratuito disponible
- ✅ Variables de entorno fáciles

**Pasos:**

```powershell
# 1. Crear cuenta en railway.app
# 2. Nuevo proyecto > Deploy from GitHub
# 3. Seleccionar repositorio
# 4. Railway detecta automáticamente Node.js
# 5. Agregar PostgreSQL desde "New" > "Database"
# 6. Railway genera DATABASE_URL automáticamente
# 7. Configurar variables de entorno:
PORT=3000
NODE_ENV=production

# 8. Agregar railway.json en backend/
```

**backend/railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run prisma:generate && npm run build"
  },
  "deploy": {
    "startCommand": "npm run prisma:migrate deploy && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 2. Render.com

**Características:**
- ✅ PostgreSQL incluido (plan gratuito limitado)
- ✅ SSL automático
- ✅ Deploy automático

**Pasos:**

```powershell
# 1. Crear cuenta en render.com
# 2. New > PostgreSQL
# 3. New > Web Service
# 4. Conectar repositorio GitHub
# 5. Configuración:
#    - Root Directory: backend
#    - Build Command: npm install && npm run prisma:generate && npm run build
#    - Start Command: npm run prisma:migrate deploy && npm start
# 6. Variables de entorno:
DATABASE_URL=<Internal Database URL from PostgreSQL>
NODE_ENV=production
```

#### 3. Heroku

```powershell
# 1. Instalar Heroku CLI
# 2. Login
heroku login

# 3. Crear app
cd backend
heroku create mi-crud-api

# 4. Agregar PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Configurar buildpack
heroku buildpacks:set heroku/nodejs

# 6. Agregar Procfile
echo "web: npm run prisma:migrate deploy && npm start" > Procfile

# 7. Deploy
git push heroku main

# 8. Ver logs
heroku logs --tail
```

#### 4. DigitalOcean App Platform

```powershell
# 1. Crear cuenta en DigitalOcean
# 2. Apps > Create App
# 3. Conectar GitHub
# 4. Configurar:
#    - Type: Web Service
#    - Build Command: npm install && npm run build
#    - Run Command: npm start
# 5. Agregar PostgreSQL Database
# 6. Variables de entorno automáticas
```

---

### Frontend

#### 1. Vercel (Recomendado)

**Características:**
- ✅ Optimizado para React/Vite
- ✅ Deploy automático
- ✅ CDN global
- ✅ SSL gratis

**Pasos:**

```powershell
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. En la carpeta frontend
cd frontend
vercel

# Responder preguntas:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N
# - What's your project's name? crud-frontend
# - In which directory is your code located? ./
# - Want to override settings? N

# 3. Configurar variables de entorno en Vercel Dashboard
VITE_API_URL=https://tu-backend.railway.app/api

# 4. Redeploy
vercel --prod
```

**Alternativa - Deploy desde GitHub:**

```powershell
# 1. Push a GitHub
# 2. Ir a vercel.com
# 3. New Project > Import Git Repository
# 4. Configuración:
#    - Framework Preset: Vite
#    - Root Directory: frontend
#    - Build Command: npm run build
#    - Output Directory: dist
# 5. Agregar variables de entorno
# 6. Deploy
```

#### 2. Netlify

```powershell
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. En frontend
cd frontend
netlify deploy

# 3. Seguir instrucciones
# 4. Para producción
netlify deploy --prod

# Variables de entorno en netlify.toml:
```

**frontend/netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://tu-backend.railway.app/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. GitHub Pages (Solo frontend estático)

```powershell
# 1. Instalar gh-pages
npm install -D gh-pages

# 2. Agregar scripts a package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# 3. Configurar base en vite.config.ts
export default defineConfig({
  base: '/nombre-repo/',
  plugins: [react()],
})

# 4. Deploy
npm run deploy
```

---

## 🔧 Configuración para Producción

### Backend

**Actualizar backend/src/index.ts:**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS para producción
const allowedOrigins = [
  'http://localhost:5173',
  'https://tu-frontend.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

**Variables de entorno de producción:**

```env
# .env.production
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
```

### Frontend

**Actualizar frontend/src/services/api.ts:**

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Variables de entorno:**

```env
# .env.production
VITE_API_URL=https://tu-backend.railway.app/api
```

---

## 🔒 Seguridad

### Backend

```powershell
# Instalar paquetes de seguridad
npm install helmet express-rate-limit compression
```

**Actualizar index.ts:**

```typescript
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

// Seguridad
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite por IP
  message: 'Too many requests from this IP',
});
app.use('/api/', limiter);
```

---

## 📊 Monitoreo

### Opciones

1. **Sentry** - Error tracking
```powershell
npm install @sentry/node
```

2. **LogTail** - Logging
```powershell
npm install @logtail/node
```

3. **Uptime Robot** - Monitoring
- Monitorea https://tu-backend.com/api/health

---

## 🔄 CI/CD con GitHub Actions

**.github/workflows/deploy.yml:**

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Backend Dependencies
        working-directory: ./backend
        run: npm install
      
      - name: Install Frontend Dependencies
        working-directory: ./frontend
        run: npm install
      
      # Agregar tests aquí cuando los tengas
      # - name: Run Tests
      #   run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Railway/Vercel deploy automáticamente
      # desde GitHub, no necesitas configurar nada más
```

---

## 📝 Checklist Post-Despliegue

- [ ] Backend responde en /api/health
- [ ] Frontend carga correctamente
- [ ] CORS configurado correctamente
- [ ] Variables de entorno configuradas
- [ ] Base de datos conectada
- [ ] Migraciones aplicadas
- [ ] SSL/HTTPS funcionando
- [ ] Dominios personalizados (opcional)
- [ ] Monitoreo configurado
- [ ] Backup de base de datos configurado

---

## 🌟 Recomendación Final

**Stack de Producción Recomendado (Gratuito para empezar):**

- **Backend**: Railway.app
  - ✅ PostgreSQL incluido
  - ✅ Deploy automático
  - ✅ $5 gratis/mes
  
- **Frontend**: Vercel
  - ✅ Optimizado para React
  - ✅ CDN global
  - ✅ Plan gratuito generoso

**Total Cost**: $0 - $10/mes para empezar

---

¡Tu aplicación CRUD lista para producción! 🎉
