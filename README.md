# PaginaWeb247

Version estatica en HTML, CSS y JS puro para Cloudflare Pages.

## Estructura final

- `index.html`: landing principal.
- `servicios.html`: pagina de servicios.
- `proyectos.html`: pagina de proyectos.
- `contacto.html`: pagina de contacto.
- `partials/header.html`: header/navbar compartido.
- `partials/footer.html`: footer compartido.
- `partials/whatsapp.html`: boton flotante compartido.
- `css/main.css`: estilos principales.
- `js/site-config.js`: configuracion global.
- `js/layout.js`: loader de parciales compartidos.
- `js/main.js`: interacciones y animaciones del sitio.
- `images/image.png`: imagen base.
- `_redirects`: rutas amigables para Cloudflare.

## Publicar en Cloudflare Pages

1. Sube este repositorio a GitHub.
2. En Cloudflare Pages crea un nuevo proyecto y conecta el repo.
3. Build command: vacio.
4. Build output directory: `.` (raiz del repositorio).
5. Deploy.

## Editar contenido rapido

- Header/Footer/WhatsApp global: edita `partials/*.html` una sola vez.
- Servicios: edita/duplica bloques `<article class="service-card">`.
- Proyectos: edita/duplica bloques `.project-item`.
- Contacto: edita redes y datos del mapa en `#agencia247-contact-map`.
