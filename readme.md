Commit 9 — Integración de Passport con estrategia JWT

Este commit implementa Passport junto con la estrategia JWT para proteger rutas y manejar autenticación basada en tokens de manera más robusta.

¿Qué se hizo?

1. Instalación de dependencias

_passport_

_passport-jwt_



2. Configuración de la estrategia JWT

Se creó el archivo:

_src/config/passport.js_


Allí se define:

Cómo extraer el JWT desde el header Authorization: Bearer <token>.

Qué clave usar para verificar el token (JWT_SECRET).

Cómo buscar el usuario en la base de datos a partir del payload decodificado.



3. Protección de rutas con Passport

En app.js se implementó: passport.authenticate("jwt", { session: false })

Esto asegura que solo usuarios autenticados puedan acceder a rutas como /tasks.



4. Asociación correcta del usuario autenticado

El token contiene el campo:


{ "userId": <id-del-usuario> }


Passport lo lee y lo adjunta como: req.user

De esta forma, todas las tareas creadas o consultadas quedan asociadas al usuario autenticado.



¿Por qué usar Passport si ya existía un middleware personalizado?

Aunque ya teníamos un middleware propio para validar JWT, se decidió integrar Passport porque:

1. Estandariza la autenticación

Passport es una librería usada internacionalmente, probada y mantenida.
Aporta estabilidad, compatibilidad y buenas prácticas.


2. Facilita agregar más estrategias si en el futuro queremos añadir:

OAuth (Google, GitHub, Facebook)

Auth local

Tokens de refresco

Passport ya lo soporta sin reescribir lógica desde cero.


3. Reduce lógica duplicada

El middleware propio validaba tokens manualmente.
Passport abstrae eso, evita errores y mantiene el código más limpio.


4. Requiere menos código para proteger rutas

Con Passport basta con:

passport.authenticate("jwt", { session: false })

Sin necesidad de revalidar el token en cada controlador.


5. Mejor mantenimiento a largo plazo

El equipo puede entender, extender o reemplazar estrategias sin tocar demasiados archivos.



_Validación del Commit 9_

Se realizaron las siguientes pruebas:

1. Login exitoso

El endpoint /auth/login devuelve un JWT válido con este formato:

{
  "userId": 3,
  "iat": ...,
  "exp": ...
}

2. Solicitud a /tasks SIN token

Resultado esperado → 401 Unauthorized.

3. Solicitud a /tasks CON token válido

Resultado → acceso permitido, Passport reconoce al usuario.

4. Rutas protegidas se comportan correctamente

Las tareas creadas listan solo las del usuario dueño del token.