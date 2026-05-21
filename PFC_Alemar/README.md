# ALEMAR — Gestión de Pedidos de Frutas

Breve aplicación web para la gestión de pedidos de frutas, pensada para clientes y un rol administrador. Permite autenticación, envío de pedidos con fecha de entrega, visualización de pedidos propios y gestión básica por parte del administrador.

**Estado:** prototipo funcional (HTML/CSS/JS con Firebase en el front-end).

## Tecnologías

- HTML5, CSS3 y JavaScript (vanilla)
- Firebase Authentication (login)
- Firebase Firestore (almacenamiento de pedidos)
- html2pdf.js (generación de PDF, incluida en el proyecto)
- SheetJS / xlsx (exportar datos a Excel)
- Google Fonts (Poppins)

## Estructura de ficheros importantes

- [index.html](index.html) — Interfaz principal, contiene las distintas pantallas y modales.
- [css/styles.css](css/styles.css) — Estilos de la aplicación.
- [js/app.js](js/app.js) — Lógica de autenticación, CRUD parcial de pedidos y sincronización con Firestore.
- [img/](img/) — Imágenes de productos y logotipo.

## Pantallas y comportamiento

- **Inicio de sesión**
  - Campos: usuario (email) y contraseña.
  - Opción: recordar usuario y contraseña.
  - Distinción de rol: si el email es `administracion@alemarsl.com` se muestra la vista de administrador.

- **Pedido (cliente)**
  - Selección de `Fecha de entrega` (campo tipo `date`).
  - Lista de productos (imagen, nombre, cantidad, medida: `kg`, `cajas`, `unidades`).
  - Campo de `Observaciones`.
  - Botones: `Hacer Pedido`, `Ver mis Pedidos`, `Cerrar Sesión`.

- **Mis Pedidos (cliente)**
  - Lista con los pedidos realizados por el usuario autenticado.
  - Botón para volver a la pantalla de pedido.

- **Administración (admin)**
  - Lista de todos los pedidos (se actualiza en tiempo real con Firestore).
  - Contador total de pedidos.
  - Botones: `Descargar Excel` (exportar) y `Cerrar Sesión`.

- **Modales**
  - Modal informativo genérico.
  - Modal de confirmación para acciones destructivas.
  - Modal de edición de pedidos (interfaz presente y parcialmente implementada en `index.html` / `js/app.js`).

## Firebase

La app utiliza Firebase para autenticación y para almacenar/leer los pedidos en Firestore. El proyecto contiene la configuración básica en `js/app.js`; para usarlo en otro proyecto:

1. Crear un proyecto en Firebase y Firestore.
2. Habilitar Authentication (email/password) y crear usuarios de prueba.
3. Reemplazar la configuración de Firebase en `js/app.js` por la del nuevo proyecto.

> Nota: en producción se recomienda no exponer la configuración en el front-end tal cual y proteger reglas de Firestore.

## Ejecutar localmente

1. Abrir `index.html` directamente en el navegador (modo prototipo).
2. Para un entorno más cercano a producción usar un servidor estático, por ejemplo con `npx http-server`:

```bash
npx http-server -c-1 .
```

3. Abrir `http://localhost:8080` (o el puerto que indique la herramienta).

## Mejores prácticas y mejoras sugeridas

- Añadir validación completa de formularios y mensajes de error más detallados.
- Implementar control de roles más robusto en el back-end (Cloud Functions / reglas de Firestore).
- Permitir edición completa de pedidos por parte del cliente.
- Añadir filtros y paginación en la lista de pedidos del administrador.
- Internacionalizar textos (i18n) si se va a usar en varios idiomas.

## Contacto y notas

Para dudas o mejoras, abrir un issue o contactar al autor del proyecto.

---

Archivo generado/actualizado automáticamente.
