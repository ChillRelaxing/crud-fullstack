# 📡 Ejemplos de Uso de la API

Esta guía muestra ejemplos prácticos de cómo usar la API con diferentes herramientas.

## 🔧 Herramientas Recomendadas

- **Postman** - Cliente API gráfico
- **Insomnia** - Cliente API alternativo
- **cURL** - Línea de comandos
- **Thunder Client** - Extensión de VS Code

## 📋 Base URL

```
http://localhost:3000/api
```

## 👥 Endpoints de Usuarios

### 1. Obtener Todos los Usuarios

**GET** `/users`

```powershell
# cURL
curl http://localhost:3000/api/users

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "createdAt": "2024-10-15T10:30:00.000Z",
    "updatedAt": "2024-10-15T10:30:00.000Z",
    "posts": [
      {
        "id": 1,
        "title": "Mi primer post",
        "content": "Contenido...",
        "published": true,
        "authorId": 1,
        "createdAt": "2024-10-15T10:35:00.000Z",
        "updatedAt": "2024-10-15T10:35:00.000Z"
      }
    ]
  }
]
```

---

### 2. Obtener Usuario por ID

**GET** `/users/:id`

```powershell
# cURL
curl http://localhost:3000/api/users/1

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Get
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "email": "juan@example.com",
  "name": "Juan Pérez",
  "createdAt": "2024-10-15T10:30:00.000Z",
  "updatedAt": "2024-10-15T10:30:00.000Z",
  "posts": []
}
```

**Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

### 3. Crear Usuario

**POST** `/users`

```powershell
# cURL
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "maria@example.com"
  }'

# PowerShell
$body = @{
    name = "María García"
    email = "maria@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

**Body:**
```json
{
  "name": "María García",
  "email": "maria@example.com"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 2,
  "email": "maria@example.com",
  "name": "María García",
  "createdAt": "2024-10-15T11:00:00.000Z",
  "updatedAt": "2024-10-15T11:00:00.000Z"
}
```

**Errores:**
```json
// 400 Bad Request - Email duplicado
{
  "error": "Email already exists"
}

// 400 Bad Request - Datos faltantes
{
  "error": "Email and name are required"
}
```

---

### 4. Actualizar Usuario

**PUT** `/users/:id`

```powershell
# cURL
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez"
  }'

# PowerShell
$body = @{
    name = "Juan Carlos Pérez"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" `
  -Method Put `
  -ContentType "application/json" `
  -Body $body
```

**Body (campos opcionales):**
```json
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "email": "juancarlos@example.com",
  "name": "Juan Carlos Pérez",
  "createdAt": "2024-10-15T10:30:00.000Z",
  "updatedAt": "2024-10-15T11:15:00.000Z"
}
```

---

### 5. Eliminar Usuario

**DELETE** `/users/:id`

```powershell
# cURL
curl -X DELETE http://localhost:3000/api/users/1

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Delete
```

**Respuesta (204 No Content):**
```
(Sin contenido)
```

**Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

> ⚠️ **Nota:** Al eliminar un usuario, todos sus posts también se eliminan (CASCADE).

---

## 📝 Endpoints de Posts

### 1. Obtener Todos los Posts

**GET** `/posts`

```powershell
# cURL
curl http://localhost:3000/api/posts

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method Get
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Introducción a TypeScript",
    "content": "TypeScript es un superset de JavaScript...",
    "published": true,
    "authorId": 1,
    "createdAt": "2024-10-15T10:35:00.000Z",
    "updatedAt": "2024-10-15T10:35:00.000Z",
    "author": {
      "id": 1,
      "email": "juan@example.com",
      "name": "Juan Pérez",
      "createdAt": "2024-10-15T10:30:00.000Z",
      "updatedAt": "2024-10-15T10:30:00.000Z"
    }
  }
]
```

---

### 2. Obtener Post por ID

**GET** `/posts/:id`

```powershell
# cURL
curl http://localhost:3000/api/posts/1

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method Get
```

---

### 3. Obtener Posts de un Usuario

**GET** `/posts/user/:userId`

```powershell
# cURL
curl http://localhost:3000/api/posts/user/1

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/user/1" -Method Get
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Post del usuario 1",
    "content": "...",
    "published": true,
    "authorId": 1,
    "author": { ... }
  }
]
```

---

### 4. Crear Post

**POST** `/posts`

```powershell
# cURL
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi nuevo post",
    "content": "Contenido del post",
    "published": true,
    "authorId": 1
  }'

# PowerShell
$body = @{
    title = "Mi nuevo post"
    content = "Contenido del post"
    published = $true
    authorId = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/posts" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

**Body:**
```json
{
  "title": "Mi nuevo post",
  "content": "Contenido del post (opcional)",
  "published": false,
  "authorId": 1
}
```

**Campos:**
- `title` (requerido): string
- `content` (opcional): string | null
- `published` (opcional, default: false): boolean
- `authorId` (requerido): number

**Respuesta (201 Created):**
```json
{
  "id": 2,
  "title": "Mi nuevo post",
  "content": "Contenido del post",
  "published": true,
  "authorId": 1,
  "createdAt": "2024-10-15T11:30:00.000Z",
  "updatedAt": "2024-10-15T11:30:00.000Z",
  "author": {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "createdAt": "2024-10-15T10:30:00.000Z",
    "updatedAt": "2024-10-15T10:30:00.000Z"
  }
}
```

**Errores:**
```json
// 400 Bad Request - Autor no existe
{
  "error": "Author not found"
}

// 400 Bad Request - Datos faltantes
{
  "error": "Title and authorId are required"
}
```

---

### 5. Actualizar Post

**PUT** `/posts/:id`

```powershell
# cURL
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título actualizado",
    "published": true
  }'

# PowerShell
$body = @{
    title = "Título actualizado"
    published = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" `
  -Method Put `
  -ContentType "application/json" `
  -Body $body
```

**Body (todos los campos opcionales):**
```json
{
  "title": "Título actualizado",
  "content": "Contenido actualizado",
  "published": true
}
```

> 📝 **Nota:** No se puede cambiar el `authorId` después de crear el post.

---

### 6. Eliminar Post

**DELETE** `/posts/:id`

```powershell
# cURL
curl -X DELETE http://localhost:3000/api/posts/1

# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method Delete
```

**Respuesta (204 No Content):**
```
(Sin contenido)
```

---

## 🧪 Colección de Postman

Puedes importar esta colección JSON en Postman:

```json
{
  "info": {
    "name": "CRUD API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/users",
              "host": ["{{baseUrl}}"],
              "path": ["users"]
            }
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/users",
              "host": ["{{baseUrl}}"],
              "path": ["users"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000/api"
    }
  ]
}
```

---

## 🔍 Health Check

**GET** `/health`

```powershell
curl http://localhost:3000/api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa (GET, PUT) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 204 | No Content | Eliminación exitosa (DELETE) |
| 400 | Bad Request | Datos inválidos o faltantes |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

¡Ahora puedes probar todos los endpoints de la API! 🚀
