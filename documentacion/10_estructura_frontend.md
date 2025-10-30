# 🧱 Estructura tecnica del proyecto (FrontEnd)

## Objetivo

Definir la estructura del proyecto frontend para mantener un codigo limpio, escalable y facil de mantener.
El stack principal será **Next.js 15**, **TailwindCSS**, **TanStack Query**, **Zustand**, y **Supabase**.

## ⚙️ Tecnologías base

| Tecnología                 | Uso principal                                  |
| -------------------------- | ---------------------------------------------- |
| **Next.js**                | Framework React con rutas y SSR/ISR            |
| **TailwindCSS**            | Estilos rápidos y consistentes                 |
| **TanStack Query**         | Cache y gestión de datos desde Supabase        |
| **Zustand**                | Estados globales simples (carrito, sesión, UI) |
| **Supabase JS SDK**        | Conexión con base de datos y autenticación     |
| **TypeScript**             | Tipado fuerte y autocompletado                 |
| **Shadcn/UI** _(opcional)_ | Componentes preconstruidos de calidad          |

/src
|--app/
| |--(public)/
| | |--[slug]/page.tsx -> Carta Digital Publica
| |
| |--(dashboard)
| | |--layout.tsx -> Layout General del panel
| | |--page.tsx -> Dashboard Principal
| | |--productos/page.tsx -> Listado Crud de los productos
| | |--categorias/page.tsx -> Listado Crud de las categorias
| | |--pedidos/page.tsx -> Gestion de Pedidos
| |
| |--login/page.tsx -> Inicio de Sesion
| |--not-found.tsx
|
|--Components
| |--carta/
| | |--ListaProductos.tsx
| | |--ListaCategorias.tsx
| | |--ModalCarrito.tsx
| | |--ProductoCard.tsx
| | |--NavBar.tsx
| |
| |--dashboard/
| | |--SideBar.tsx
| | |--Headet.tsx
| | |--Card.tsx
| | |--ListMain.tsx
| | |--TablaProductos.tsx
| | |--TablaPedidos.tsx
| | |--FromProducot.tsx
| | |--TablaCategorias.tsx
| | |--FormCategoria.tsx
| | |--TrProducto.tsx
| | |--TrCateogira.tsx
| |
| |--ui/ -> Botones, inputs, Tarjeta Producto, Footer
| |--shared/ -> Loaders, Alertas
|
|--hooks/
| |--productos/
| |   |--useProductos.ts -> TanStack Query: obtener productos
| |   |--useMutateProductos.ts -> TanStack Query: mutaciones de productos
| |--categorias/
| |   |--useCategorias.ts -> TanStack Query: obtener categorias
| |   |--useMutateCategoria.ts -> TanStack Query: mutaciones de categorias
| |--egresos/
| |   |--useEgresos.ts -> TanStack Query: obtener egresos
| |   |--useMutateEgresos.ts -> TanStack Query: mutaciones de egresos
| |--tipoEgresos/
| |   |--useTipoEgresos.ts -> TanStack Query: obtener tipos de egreso
| |   |--useMutateTipoEgresos.ts -> TanStack Query: mutaciones de tipos de egreso
| |--pedidos/
| |   |--usePedidos.ts -> TanStack Query: obtener pedidos
| |   |--useMutatePedidos.ts -> TanStack Query: mutaciones de pedidos
|
|--mappers/
| |--producto.mapper.ts
| |--categoria.mapper.ts
| |--pedido.mapper.ts
| |--usuario.mapper.ts
| |--rotiseria.mapper.ts
|
|--actions/
| |--productos.actions.ts -> CRUD de los productos
| |--categorias.actions.ts -> CRUD de las categorias
| |--pedidos.actions.ts -> crear Pedidos
| |--auth.actions.ts -> login / logout
|
|--store/
| |--useCarrito -> Estado del carrito (Zunstand)
| |--useUi.ts -> Estado globales de UI(modales, loaders)
| |--useRotiseria.ts -> Informacion de la rotiseria actual
|
|--interface/
| |--producto.ts -> Interface Producto
| |--categoria.ts -> Interface Categoria
| |--pedido.ts -> Interface Pedido
| |--usuario.ts -> Interface Usuario
| |--rotiseria.ts -> Interface Rotiseria
|
|-- lib/
| |--supabaseClient.ts -> Inicializacion de Supabase
| |--utils.ts -> funciones Auxiliares
| |--constants.ts -> Constantes globales (por ejemplo url base)
|
|--styles
| |--global.css
| |--tailwind.css
|
|--types/ -> Tipos Gloales compartidos
|--index.d.ts

# Explicacion de carpetas claves

### '/aap/(public)

Rutas publcias visibles para el publico sin necesidad de authenticacion

Incluye:

- Lista de Productos y Categorais
- Modal de carrito
- Boton para confirmar pedido y el posterio envio a whtasapp

### '/app/(dashboard)

Rutas privadas( solo dueños o empleados autenticados)
Panel de control donde gestionar productos, categorias, pedidos, etc.

Incluye:

- Layout con sidebar y encabezado
- Secciones CRUD con TansTackQuery + Supabase
- Acciones protegidas (validacion de Sesion)

### 'Hooks/'

Contiene hooks personalizados para consumir datos con **TansTackQuery**
Cada Hook se comunica con actions o directamente a Supabase y mantiene el estado cacheado

### '/Mappers'

Esta carpeta va a servir para los objetos que traigamos de la api transofrmarlos a algo que usemos en el frontend asi si cambian con el tiempo solo actualizamos aca
ej: Producto {
nombre,
precio,
imagen
} asi viene desde la api y en el frontend usamos
Producto {
title,
price,
image
}

### '/actions'

Agrupa las funciones con intercacion de la API.
Cada archivo representa un modulo de negocio (Productos, Categorias, etc)

### '/store'

Estados globales que maneja **Zunstand**

### '/interfaces'

Contiene las interfaces de todos modulos para un tipado fuerte y claro

### '/lib'

Codigo utilitario que no corresponde a ninguna funcionalidad especifica
