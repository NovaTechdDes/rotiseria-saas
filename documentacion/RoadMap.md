# 🗺️ Roadmap de desarrollo - Plataforma de rotiserias

## 🎯 Objetivo General

Desarrollar una aplicacion web que permita a las rotiserias ofrecer una carta digital donde sus clientes puedan realizar pedidios en linea.
El producto evolucionará en fases, comenzando por el frontend para validar el concepto rápidamente y captar los primeros clientes.

## 🚀 Fase 1 - MVP Frontend (Validacion de idea)

**Objetivo** Tener una carta digital con listado de productos y categorias con filtros mas un carrito funcional para el envio del pedido de whatsApp

### Alcance:

    -Desarrollar el sitio con **Next.js**, **TailwindCss** y **Zunstand**.
    -Crear una estructura de rutas: '/[Slug]' para cada rotiseria.
    -Simular Datos (JSON local).
    -implementar la vista de los productos y el carrito.
    -Agregar Boton de **Confirmar Por WhatsApp**.
    -Diseño responsivo para mobile.

###Entregables:

-Carta funcional (ej: 'cartadigitial.com.ar').
-Documentancion con flujo de usuario y diseño base
-Feedback de 2-3 rotiserias reales

## 🚀 Fase 2 - Dashboard Frontend

**Objetivo** Construir el dashboard completo del dueño de la rotiseria sin los graficos o reportes y sin la configuracion de la pagina

###Alcance:
-Dessarrolar el login mas el dashboard (producto, categorias y pedidodos)
-Implementar los modal de agregar o modificar productos y categorias
-Botones de accione para poder eliminar categorias o productos con confirmacion previa

###Entregables:
-Dashbord funciona con datos json
-Documentacion con flujo de usuario

## Fase 3 - creacion de funciones para zunstand y tanstackquery

**Objetivo** Dejar hechas las funciiones para la peticion de datos y el manejo global de la aplicacion

###Alcance:
-Poder generar un crud de productos y de categorais minimo
-Implementar acciones de peticiones de datos al backend local
-Hooks de tanstackquery para la peticion de datos
-Hooks de mutacion tanstackquery
-Store de los pedidos, productos y categorias

###Entregables:
-Permitir el manejo de peticiones o mutaciones atraves de tasntaquery con el backend
-Acciones lista para su utilizacion
-Store completo

## Fase 4 - Conexion con supabase
