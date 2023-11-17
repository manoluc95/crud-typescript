# Curso de NodeJS con TypeScript y TypeORM

En este curso aprenderas como generar una API REST compleja con NodeJS utilizando como lenguage core `TypeScript` y `TypeORM` como ORM SQL.

## Tecnologias a aplicar:

- POO.
- Docker Compose como base de datos.
- Configuracion de TypeScript.
- Configuracion de rutas, controladores, servicios y entidades.

## Configurar entorno de trabajo para node y typescript
- npm init -y 
- tsc --init

## Lista de dependencias para instalacion:

Dependencias necesarias:

```
npm install class-validator cors dotenv express morgan mysql ejs typeorm typeorm-naming-strategies typescript
```

Dependencias de desarrollo necesarias:

```
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
```
# Comandos para docker compose
``` sh
docker-compose up -d

docker ps 

docker exec -it NOMBRE_DEL_CONTENEDOR_MYSQL mysql -u USUARIO -p
```

si surge error ER_NOT_SUPPORTED_AUTH_MODE entrar al contenedor, entrar a mysql y ejecutar ⬇️
``` sh
ALTER USER 'ucoder' IDENTIFIED WITH mysql_native_password BY 'secret';
flush privileges;
```

utilizo comandos de mysql

``` sh
SHOW DATABASES;

USE NOMBRE_DE_LA_BASE_DE_DATOS;

SHOW TABLES; 

SHOW COLUMNS FROM nombre_de_la_tabla;
```

# Configuración para utilizar migraciones (clase 6)
```
npm install reflect-metadata
```
```
npm install -D ts-node
```

En package.json creo los siguientes script:
- "typeorm": "typeorm-ts-node-esm -d ./src/config/data.source.ts",
- "m:gen": "npm run typeorm migration:generate",
- "m:run": "npm run typeorm migration:run"

Para correr las migraciones:
```
npm run m:gen -- src/migrations/ChangeUser
```
```
npm run m:run
```
# Clases:

METODOS:

- <span style="color: #94fc03">PRACTICO</span>
- <span style="color: #03d7fc">TEORICO</span>
- <span style="color: #fc7b03">TEORICO / PRACTICO</span>

| CLASE 1         | Metodo                                                 | Contenido                                    |
| --------------- | ------------------------------------------------------ | -------------------------------------------- |
| **Inicio - P1** | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | Creación de `package.json`                   |
| **Inicio - P1** | <span style="color: #94fc03">PRACTICO</span>           | Instalando dependencias necesarias           |
| **Inicio - P1** | <span style="color: #94fc03">PRACTICO</span>           | Agregando dependencias a utilizar            |
| **Inicio - P1** | <span style="color: #94fc03">PRACTICO</span>           | Configurando `Express`                       |
| **Inicio - P1** | <span style="color: #94fc03">PRACTICO</span>           | Levantando un servidor a traves de una clase |
| **Ruteo - P2**  | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | Aplicar un prefijo global para nuestra API   |
| **Ruteo - P2**  | <span style="color: #94fc03">PRACTICO</span>           | Generando mi primera ruta                    |
| **Ruteo - P2**  | <span style="color: #94fc03">PRACTICO</span>           | Ejecutando lo realizado en Postman           |

| CLASE 2         | Metodo                                                 | Contenido                                                   |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| **Ruteo**       | <span style="color: #94fc03">PRACTICO</span>           | Modalidad de ruta para aplicar en un servidor basado en POO |
| **Ruteo**       | <span style="color: #94fc03">PRACTICO</span>           | Generando rutas extendidas de una ruta base                 |
| **Controlador** | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | ¿Que es un controlador? Explicado en ruta                   |

| CLASE 3    | Metodo                                                 | Contenido                                                |
| ---------- | ------------------------------------------------------ | -------------------------------------------------------- |
| **Config** | <span style="color: #94fc03">PRACTICO</span>           | Configuracion de variables de entorno                    |
| **Config** | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | ¿Que es un entorno de ejecucion? Explicado en config     |
| **Config** | <span style="color: #94fc03">PRACTICO</span>           | Declaracion de variables de entorno en nuestro server.ts |

| CLASE 4                 | Metodo                                                 | Contenido                                                 |
| ----------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| **Docker Compose (DB)** | <span style="color: #94fc03">PRACTICO</span>           | Crear nuestro `docker-compose.yml`                        |
| **Docker Compose (DB)** | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | Ejecutando nuestro docker-compose y comprobar la conexion |
| **TypeORM (DB)**        | <span style="color: #94fc03">PRACTICO</span>           | Crear nuestro getter de configuracion de conexion         |
| **TypeORM (DB)**        | <span style="color: #94fc03">PRACTICO</span>           | Ejecutar la conexion en nuestro server                    |
| **TypeORM (DB)**        | <span style="color: #94fc03">PRACTICO</span>           | Crear nuestra entidad base con datos comunes              |
| **TypeORM (DB)**        | <span style="color: #94fc03">PRACTICO</span>           | Creando nuestra primer entidad para nuestra base de datos |

| CLASE 5     | Metodo                                       | Contenido                                                                           |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Entidad** | <span style="color: #03d7fc">TEORICO</span>  | Propuesta de arquitectura de entidades                                              |
| **General** | <span style="color: #94fc03">PRACTICO</span> | Modificacion de distribucion de proyecto de manera modular                          |
| **Entidad** | <span style="color: #03d7fc">TEORICO</span>  | Muestra de relaciones (uno a muchos (N:1), uno a uno (1:1) y muchos a muchos (N:N)) |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | Users: Modificacion de entidad usuario                                              |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | Customer: Creacion de entidad y relaciones                                          |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | Products: Creacion de entidad y relaciones                                          |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | Categories: Creacion de entidad y relaciones                                        |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | Purchases: Creacion de entidad y relaciones                                         |
| **Entidad** | <span style="color: #94fc03">PRACTICO</span> | `purchases_products`: Creacion de entidad N:N custom y relaciones            

| CLASE 6         | Metodo                                                 | Contenido                                                               |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |

| **Servicio**    | <span style="color: #fc7b03">TEORICO / PRACTICO</span> | Que son y para que sirven los servicios                                 |
| **Servicio**    | <span style="color: #94fc03">PRACTICO</span>           | Instanciando metodos desplegados con funcion de repositorio con TypeORM |
| **Servicio**    | <span style="color: #94fc03">PRACTICO</span>           | Creacion de `findAll` `findById` `create` `update` `delete`             |
| **Controlador** | <span style="color: #94fc03">PRACTICO</span>           | Integracion de metodos instanciando servicios con los controladores     |


                            |       |