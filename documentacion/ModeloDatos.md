# Modelo de datos - Tablas

El sistema utiliza una sola base de datos compartida (Multi-tenant) donde cada rotiseria se identifica por su `id`.
Todas las tablas relacionadas (productos, pedidos, usuarios) tienen un campo `rotiseria_id` que permite aislar los datos de cada cliente.

## 🏪 Tabla: Rotiseria

**Descripcion:**Almacena la informacion principal de cada negocio

| Campo     | Tipo      | Descripcion                           |
| --------- | --------- | ------------------------------------- |
| id        | uuid      | Identificador Unico                   |
| nombre    | string    | Nombre de la Rotiseria                |
| slug      | string    | Identificador Publico (ej: "elcrack") |
| dominio   | string    | Dominio personalizado                 |
| telefono  | string    | WhatsApp para recibir Pedidos         |
| horario   | text      | Horario de Atencion                   |
| logo      | text      | URL del logo                          |
| creado_en | timestamp | Fecha de alta                         |

## 🍔 Tabla: Producto

**Descripcion:** lista de productos ofrecidos por cada rotiseria

| Campo        | Tipo    | Descripcion          |
| ------------ | ------- | -------------------- |
| id           | uuid    | Identificador unico  |
| roriseria_id | uuid    | FK → rotiserias.id   |
| nombre       | string  | Nombre del producto  |
| descripcion  | string  | Descripicon corta    |
| precio       | number  | Precio del producto  |
| imagen       | string  | URL de la imagen     |
| categoria    | string  | Categoria            |
| activo       | boolean | si esta visible o no |

## Tabla: Categoria

**Categorias:** lista de categorias ofrecidos por cada rotiseria que contienen cada productos

| Campo        | Tipo   | Descripcion            |
| ------------ | ------ | ---------------------- |
| id           | uuid   | Identificador unico    |
| nombre       | string | nombre de la categoria |
| rotiseria_id | uuid   | FK → rotiserias.id     |

## 🧾 Tabla: Pedido

**Descripcion:** pedidos que llegan desde la carta digital.

| Campo          | Tipo      | Descripcion                                  |
| -------------- | --------- | -------------------------------------------- |
| id             | uuid      | Identificador unico                          |
| rotiseria_id   | uuid      | FK → rotiserias.id                           |
| cliente_nombre | string    | Telefono (opcionar)                          |
| total          | number    | Monto total                                  |
| estado         | string    | (pediente / preparando / listo / entregado ) |
| creado_en      | timestamp | Fecha del pedido                             |

## 👥 Tabla: Usuario

**Descripcion:** usuarios del dashboard

| Campo        | Tipo      | Descripcion               |
| ------------ | --------- | ------------------------- |
| id           | uuid      | Identificador del usuario |
| rotiseria_id | uuid      | FK → rotiserias.id        |
| email        | string    | Email de acceso           |
| rol          | string    | ( admin / empleado)       |
| creado_en    | timestamp | Fecha de creacion         |
| contraseña   | string    | Contraseña del usuario    |

## Tabla: Egreso

**Descripcion:** Lista de egresos que el dueño decide crear

| Campo        | Tipo          | Descripcion              |
| ------------ | ------------- | ------------------------ |
| id           | uuid          | Identificador del egreso |
| rotiseria_id | uuid          | FK → rotiserias.id       |
| tipo         | TipoCategoria | FK → tipoCategoria.id    |
| importe      | number        | importe del egreso       |
| descripcion  | string        | descripcion de el texto  |
| creado_por   | usuario       | FK → usuarios.id         |
| creado_en    | timestamp     | fecha del egreso         |

## Tabla: TipoEgreso

**Descripcion:** Lista de los tipos de categorias

| Campo        | Tipo   | Descripcion                 |
| ------------ | ------ | --------------------------- |
| id           | uuid   | Identiificado del egreso    |
| rotiseria_id | uuid   | FK → rotiserias.id          |
| nombre       | string | nombre de el tipo de egreso |

## Tabla: MovProducto

**Descripcion:** Lista de los movimientos de los productos con cada pedido

| Campo          | Tipo      | Descripcion                  |
| -------------- | --------- | ---------------------------- |
| id             | uuid      | Identificador del mov        |
| rotiseria_id   | uuid      | FK → rotiserias.id           |
| producto id    | uuid      | FK → productos.id            |
| numeroPedido   | number    | numero de los pedidos        |
| cantidad       | number    | cantidad del producto        |
| precioUnitario | number    | precio unitario del producto |
| creado_en      | timestamp | fecha del mov                |

## 🧠 Relaciones

- Una **Rotiseria** tiene muchos **Productos**
- Una **Rotiseria** tiene muchos **Pedidios**
- Un **Usuario** pertenece a una **Rotiseria**
