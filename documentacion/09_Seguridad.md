# Seguridad y control de acceso

- Usuario: admin, empleado, cliente publico, dueño

# Politicas de Accesos (RLS en supabase)

- Solo mostrar productos y categorias donde rotiseria.id coincida con la url
- Solo poder hacer un delete de producto y categoria donde rotiseria.id coincida con el usuario autenticado y tenga prioridad de admin
- Solo poder obtener un producto y categoria o modificar si rotiseria.id coincida con el usuario autenticado
- Mostrar los pedidos para empelado y dueño
- Mostrar las estadisticas para los dueños

## Roles de Usuario

| rol       | descripcion                             | permisos principales                                                                |
| --------- | --------------------------------------- | ----------------------------------------------------------------------------------- |
| 'cliente' | Usuario publico que navega por la carta | solo lectura de productos y categorias y poder realiar pedido                       |
| 'dueño'   | propietario de la rotisera              | Crud compledo de productos, categorias, pedidos y tambien poder visualizar reportes |
| 'empleado | Personal autorizado                     | agregar o actualizar producto y categoria y tambien puee visulaizar los pedidos     |
| 'admin'   | Rol interno del sistema                 | Acceso completo al mantenimiento                                                    |
