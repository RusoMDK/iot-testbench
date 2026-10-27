# IoT Testbench

Sistema para recolectar, almacenar y visualizar los parámetros que envían dispositivos físicos durante sus pruebas. Los dispositivos publican sus lecturas por MQTT, una API en NestJS las guarda en PostgreSQL y una aplicación Angular permite gestionar dispositivos, sensores y escenarios de prueba, y consultar las lecturas en tablas y gráficas.

Proyecto de tesis de Ingeniería en Ciencias Informáticas (Universidad de las Ciencias Informáticas, 2024).

## Qué hace

- **Usuarios y roles**: registro e inicio de sesión con JWT (Passport) y contraseñas con bcrypt.
- **Dispositivos, sensores y escenarios**: CRUD completo; un escenario agrupa las condiciones de una prueba.
- **Ingesta por MQTT**: la API se suscribe a un topic del broker y guarda cada clave del JSON recibido como una lectura (`type`, `data`).
- **Consulta de lecturas**: listado con filtros y consulta por día.
- **Gráficas**: series temporales (ngx-charts) e indicadores tipo gauge por parámetro (humedad relativa, humedad del suelo…).

## Arquitectura

```
Dispositivo (Arduino) ──MQTT──▶ Broker (Mosquitto) ──▶ API NestJS ──TypeORM──▶ PostgreSQL
                                                          ▲
                                       REST + JWT         │
                                Angular (ng-zorro, ngx-charts)
```

## Stack

| Capa | Tecnologías |
|---|---|
| Backend | Node.js, NestJS, TypeORM, PostgreSQL, MQTT (`mqtt`), Passport JWT, bcrypt, class-validator |
| Frontend | Angular 17, TypeScript, ng-zorro-antd, ngx-charts, ngx-gauge, ngx-translate |

## Estructura

```
backend/
  config/            # secreto y opciones de JWT
  src/
    auth/            # registro, login, estrategias y guards
    user/ roles/     # usuarios y roles
    device/ sensors/ escenary/
    data-sensor/     # lecturas
    mqtt/            # cliente MQTT y suscripción al topic
frontend/
  src/app/
    Auth/            # login y registro
    core/            # autenticación, guard, interceptor y modelos
    shared/          # módulo compartido (ng-zorro, formularios, gráficas)
    layouts/         # cabecera, menú lateral, pie e inicio
    modules/         # Device, Sensor, Escenary, Data, Charts, User
```

## Puesta en marcha

Requisitos: Node.js 20, PostgreSQL y un broker MQTT (por ejemplo, Mosquitto).

**Backend**

```bash
cd backend
cp .env.example .env    # base de datos, secreto JWT y URL del broker
npm ci
npm run start:dev       # API en http://localhost:3000
```

TypeORM crea el esquema al arrancar (`synchronize: true`).

**Frontend**

```bash
cd frontend
npm ci
npm start               # http://localhost:4200
```

**Enviar lecturas de prueba**

Desde la vista de datos, el botón de suscripción hace que la API escuche el topic `outTopic`. Cualquier cliente MQTT puede publicar en él:

```bash
mosquitto_pub -t outTopic -m '{"humedad_relativa": 61.5, "humedad_suelo": 38}'
```

## Sobre esta versión

Es la versión pública del proyecto. Se publicó sin el historial original y sin la plantilla base con la que arrancó el frontend, que no era mía; en su lugar hay un módulo compartido mínimo. Además:

- La URL del broker MQTT pasó a variable de entorno.
- Las rutas de la API salen de `environment`.
- Se corrigieron imports que solo compilaban en sistemas de archivos sin distinción de mayúsculas.

La lógica de la aplicación es la de 2024.

## Qué cambiaría hoy

- **Suscripción MQTT.** Ahora la dispara una petición HTTP (`GET /mqtt/subscribe`) y cada llamada registra un listener nuevo, así que las lecturas se duplican. Hoy me suscribiría una sola vez al arrancar el módulo, o usaría el transporte MQTT de `@nestjs/microservices` con `@EventPattern`.
- **Tiempo real.** El frontend consulta las lecturas por HTTP. Las enviaría desde el servidor con WebSockets o Server-Sent Events.
- **Seguridad de la API.**
  - Solo el módulo de administración usa un guard.
  - El interceptor del frontend busca el token con una clave distinta a la que guarda el login, así que las peticiones salen sin cabecera `Authorization`.
  - Hoy protegería todos los endpoints con JWT y roles, con un único secreto de configuración.
- **Validación.** Los DTO usan class-validator, pero falta un `ValidationPipe` global, así que no se valida nada. Lo activaría con `whitelist` y `transform`.
- **Esquema de base de datos.** Sustituiría `synchronize: true` por migraciones de TypeORM.
- **Frontend.**
  - Todos los módulos se importan en `AppModule` aunque las rutas usan `loadChildren`, y el bundle inicial ronda los 2,8 MB.
  - Haría lazy loading real y quitaría Bootstrap, jQuery y Angular Material, que se solapan con ng-zorro.
- **Tests.** Los specs son los que genera el CLI. Añadiría pruebas de los servicios de la API y un e2e del flujo dispositivo → lectura → gráfica.

## Autor

Luis Manuel Santos · [LinkedIn](https://www.linkedin.com/in/luissantosdev/) · [Portfolio](https://luismsldev.vercel.app) · [GitHub](https://github.com/RusoMDK)
