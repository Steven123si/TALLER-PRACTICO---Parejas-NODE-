# API de Tareas — Proyecto Node.js + Express + Prisma

Este proyecto implementa una API REST para manejar usuarios y tareas.  
Incluye autenticación, seguridad, middlewares, validaciones, y un sistema completo CRUD.


## carpetas utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JWT (Json Web Tokens)
- bcryptjs
- Passport (estrategia JWT)
- CORS
- express-rate-limit
- dotenv


## Estructura del proyecto

- /src
- /controllers
- /routes
- /middleware
- /prisma
- app.js
- /docs
- README.md
- .env.example
- package.json



##  Instalación y configuración

1. Clonar el repositorio

- git clone <tu-repo>
- cd <carpeta>

2. Instalar dependencias

npm install

3. Crear archivo .env

No subir el .env al repositorio.

4. Configurar Prisma
npx prisma generate
npx prisma migrate dev --name init
(Esto genera las tablas User y Task automáticamente.)

## Seguridad implementada

1. Hash de contraseñas (bcrypt)

Las contraseñas nunca se almacenan en texto plano.
Se usa bcrypt.hash(password, 10) al registrarse.
En login se compara con bcrypt.compare().

2. JWT para autenticación

Se genera token al hacer login.
Incluye { sub: user.id } y expira en 1 hora.
Para rutas protegidas se debe enviar: Authorization: Bearer <token>

3. Middleware de autenticación

Archivo: src/middleware/authMiddleware.js

Se realizó:

- Verificar token
- Decodificarlo
- Adjuntar userId a req.user

Si no existe token → 401
Si token inválido → 403

4. CORS

En app.js: app.use(cors({ origin: "*" }));

Permite consumir la API desde cualquier frontend.
Se puede restringir cuando el proyecto pase a producción.

5. Rate limit

Protecciones configuradas:

/auth/login

Maximo 5 intentos por minuto
Evita ataques de fuerza bruta.

/tasks

Maximo 20 solicitudes por minuto
Evita abuso de la API.

6. Variables de entorno

Todo lo sensible (DB, secret keys) está dentro de .env
.env está ignorado por Git mediante .gitignore.

Esto protege claves privadas.

## Endpoints disponibles

1. Autenticación

POST /auth/register

Registra un usuario.

POST /auth/login

Devuelve token JWT.

2. Tareas (requiere JWT)
GET /tasks

Listar tareas del usuario logueado.

POST /tasks

Crear tarea.

PUT /tasks/:id

Editar tarea.

DELETE /tasks/:id

Eliminar tarea.

## Cómo probar la API

1. Registrar usuario
POST http://localhost:3000/auth/register

{
  "email": "test@test.com",
  "password": "123456"
}

2. Iniciar sesión
POST http://localhost:3000/auth/login
→ devuelve token

3. Probar rutas protegidas
Agregar en el Header:
Authorization: Bearer <token>

## Cómo ejecutar
npm run start

### Para desarrollo:
npm run dev

## Estado final de los commits

1. Inicialización del proyecto
2. Configuración de Prisma
3. CRUD de tareas
4. Documentación PRISMA
5. Registro de usuario
6. Login con JWT
7. Middleware de autenticación
8. CORS y rate limiting
9. Passport JWT
10. README terminado (este commit)