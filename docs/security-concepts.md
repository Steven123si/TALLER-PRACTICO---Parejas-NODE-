Conceptos de Seguridad
1. Rate-limit

El rate-limit es una técnica que nos permite limitar cuántas veces se puede hacer una petición a la API dentro de un tiempo específico.

¿Para qué sirve?
Sirve para evitar abusos, proteger el servidor y prevenir ataques.

-Evita que hagamos miles de solicitudes por segundo.
-Protege endpoints sensibles como /auth/login.
-Reduce el riesgo de que la API se caiga por demasiadas peticiones.

Ejemplo:
Limitar /auth/login a 5 intentos por minuto para evitar que alguien pruebe muchas contraseñas seguidas.

2. CORS

CORS (Cross-Origin Resource Sharing) es una configuración que le dice al navegador qué dominios tienen permiso para consumir la API.

Los navegadores bloquean por seguridad las peticiones que vienen de un dominio diferente, así que CORS sirve para permitir solo los orígenes válidos.

¿Qué problema resuelve?

-Evita que cualquier página pueda usar tu API sin permiso.
-Permite controlar desde qué frontend se puede acceder.

ejemplo:
Si tu frontend está en:http://localhost:5173
y tu backend en:http://localhost:3000
sin configurar CORS, el navegador va a bloquear las peticiones automáticamente.

3. JWT (JSON Web Token)

Un JWT es un token que se genera cuando se inicia sesión y sirve para identificarlo en futuras peticiones sin volver a pedirle la contraseña.

¿Qué lleva dentro un JWT?

-sub o userId: el ID del usuario
-iat: fecha en la que se creó
-exp: fecha de expiración


¿Para qué sirve?
Para permitir que acceda a rutas protegidas como /tasks enviando su token en cada petición.
