# 🧭 Flujo de Usuario - Cliente (Carta Digital)

## 🎯 Objetivo

Permitir que un cliente realice un pedido de forma rapida y siemple con la informacion minima que es el nombre y el telefono

## 🧩 Actores Involucrados

- **Cliente:** Persona que entra a la carta dgital para hacer un pedido
- **Rotiseria:** Negocio que ofrece los productos y categorias
- **Sistema:** Aplicacion Web (Next.js + Supabase) que gestiona los datos.

## 📱Flujo general de cliente

### 1️⃣ Ingreso al sitio

- El cliente accede desde:
- Desde el dominio propio de la rotiseria (ej: `rotiseriaelcrack.com.ar`)
- El sistema detecta el dominio y carga los datos correspondientes de la rotiseria
- Logo y nombre
- Horarios
- Listas de productos y categorais

** Pantalla Mostrada:** _Carta Digital (Inicio)_

### 2️⃣ Exploracion de la carta

-El cliente puede navegar la carta y ver:

- Nombre, descripcion, precio e imagen de cada producto
- Filtros o categorias
- Puede ajustar cantidades o agregar productos al pedido actual.
- El sistema actualiza en tiempo real el total del pedido.

**Pantalla Mostrada:** _Listado de productos_

### 3️⃣ Revisión del pedido

-El cliente abre el carrito para revisar los productos seleccionados:
-Ver lista, cantidades y total
-Puede eliminar o modificar los items

- Si esta conforme, completa nombre, telefono y otros datos y presiona **"Confirmar Pedido"**.
  -(Opcional) Enviar mensaje por whatsApp

**Pantalla mostrada:** _Resumen del pedido_

### 4️⃣ Envío del pedido

-El sistema genera un pedido que se va a mostrar en el dashboard con estado en rojo con:
-El listado de productos y el total
-La Informacion del cliente

# 🧭 Flujo de Usuario - Dueño (Dashboard Pedidos)

## 🎯 Objetivo

Permitir ver a la rotiseria un listado de los pedidos por fecha y mostrar los que estan pendientes con un resaltado de color, mas los productos que necesitan y tambien la informacion del cliente y el importe.

### 1️⃣ Ingreso al dashboard

-El usuario accede al dashboar y se muestra un listado de pedidos
-Puede hacer click en el pedido para ver la informacion del pedido

### 2️⃣ Cambio de estado del pedido

-El usuario cambia es estado de pedidio en sus distintas opciones
-Se cambia el color del pedido

### 3️⃣ Eliminacion del pedido

-El usuario puede eliminar un pedido
-Tendra la opcion de enviar un mensaje por whatsapp

### 3️⃣.1️⃣ Sin Stock

-El usuario puede seleccionar que se quedo sin el producto y enviar por whatsapp un mensaje

# 🧭 Flujo de Usuario - Dueño (Dashboard Productos)

## 🎯 Objetivo

Permite al usuario ingresar al dashbord y poder manejar un listado de productos con su crud

### 1️⃣ Ingreso al dashboard

-El usuario accede al dashboard y muestra el listado de los productos con un filtro y sus categorias.
-Mostramos la cantidad de productos
-Dejamos las acciones que el usuario va a poder utilizar

### 2️⃣ Modificar Producto

-Pasamos a una pagina o modal para modificar el producto
-Se va a guardar el usuario que lo modifico

### 3️⃣ Eliminar Producto

-Mostramos una confirmacin para eliminar el producto
-Se v a aguardar el usuario que lo elimino

### 4️⃣Agregar producto

-Abrimos una pagina o modal para poder agregar un producto
-Queda guardado que usuario agrego el producto

# 🧭 Flujo de Usuario - Dueño (Dashboard Categorias)

## 🎯 Objetivo

Permite al usuario ingresar al dashbord y poder manejar un listado de las categoicas con su CRUD que van a estar asociados a los productos

### 1️⃣ Ingreso al dashboard

-El usuario accede al dashboard y muestra el listado de las categorias con un filtro.
-Mostramos la cantidad de categorais
-Dejamos las acciones que el usuario va a poder utilizar

### 2️⃣ Modificar Categoria

-Pasamos a un modal para modificar la categoria
-Se va a guardar el usuario que lo modifico

### 3️⃣ Eliminar Categoria

-Mostramos una condifirmacion para eliminar una categoria si es que no esta asociado a un producto
-Se va aguardar el usuario que lo elimino

### 4️⃣Agregar Categoria

-Abrimos una pagina o modal para poder agregar una Categoria
-Queda guardado que usuario agrego la categoria
