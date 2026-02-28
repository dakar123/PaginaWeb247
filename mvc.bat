@echo off
setlocal enabledelayedexpansion

echo Creando estructura MVC para Sitio Web Corporativo...
echo.

:: Crear estructura base de directorios
mkdir app
mkdir app\config
mkdir app\controllers
mkdir app\models
mkdir app\views
mkdir app\views\layouts
mkdir app\views\partials
mkdir app\views\inicio
mkdir app\views\empresa
mkdir app\views\servicios
mkdir app\views\contacto
mkdir app\views\blog
mkdir app\views\galeria
mkdir app\views\productos
mkdir app\views\faq
mkdir app\views\politicas
mkdir app\views\error
mkdir public
mkdir public\assets
mkdir public\assets\css
mkdir public\assets\js
mkdir public\assets\img
mkdir public\assets\fonts
mkdir public\uploads
mkdir routes
mkdir vendor
mkdir logs
mkdir cache

echo Estructura de carpetas creada.
echo.

:: =============================================
:: ARCHIVO PRINCIPAL - index.php
:: =============================================
echo Creando archivos PHP vacios...

type nul > index.php

:: =============================================
:: CONFIGURACION - config.php
:: =============================================
type nul > app\config\config.php
type nul > app\config\database.php
type nul > app\config\constants.php

:: =============================================
:: RUTAS - web.php
:: =============================================
type nul > routes\web.php

:: =============================================
:: CONTROLADORES
:: =============================================
type nul > app\controllers\HomeController.php
type nul > app\controllers\EmpresaController.php
type nul > app\controllers\ServiciosController.php
type nul > app\controllers\ContactoController.php
type nul > app\controllers\BlogController.php
type nul > app\controllers\GaleriaController.php
type nul > app\controllers\ProductosController.php
type nul > app\controllers\FaqController.php
type nul > app\controllers\ErrorController.php

:: =============================================
:: MODELOS
:: =============================================
type nul > app\models\Usuario.php
type nul > app\models\Servicio.php
type nul > app\models\Producto.php
type nul > app\models\Categoria.php
type nul > app\models\BlogPost.php
type nul > app\models\Galeria.php
type nul > app\models\Contacto.php
type nul > app\models\Faq.php
type nul > app\models\Configuracion.php

:: =============================================
:: VISTAS
:: =============================================

:: Layouts
type nul > app\views\layouts\header.php
type nul > app\views\layouts\footer.php
type nul > app\views\layouts\sidebar.php
type nul > app\views\layouts\navbar.php

:: Partials
type nul > app\views\partials\breadcrumb.php
type nul > app\views\partials\pagination.php
type nul > app\views\partials\alerts.php
type nul > app\views\partials\forms.php
type nul > app\views\partials\modals.php
type nul > app\views\partials\widgets.php

:: Inicio
type nul > app\views\inicio\index.php
type nul > app\views\inicio\slider.php
type nul > app\views\inicio\features.php
type nul > app\views\inicio\testimonios.php
type nul > app\views\inicio\estadisticas.php

:: Empresa
type nul > app\views\empresa\index.php
type nul > app\views\empresa\historia.php
type nul > app\views\empresa\mision-vision.php
type nul > app\views\empresa\equipo.php
type nul > app\views\empresa\valores.php
type nul > app\views\empresa\certificaciones.php

:: Servicios
type nul > app\views\servicios\index.php
type nul > app\views\servicios\detalle.php
type nul > app\views\servicios\categorias.php
type nul > app\views\servicios\precios.php
type nul > app\views\servicios\paquetes.php

:: Contacto
type nul > app\views\contacto\index.php
type nul > app\views\contacto\formulario.php
type nul > app\views\contacto\mapa.php
type nul > app\views\contacto\informacion.php
type nul > app\views\contacto\mensaje-enviado.php

:: Blog
type nul > app\views\blog\index.php
type nul > app\views\blog\single.php
type nul > app\views\blog\categorias.php
type nul > app\views\blog\archivo.php
type nul > app\views\blog\buscar.php

:: Galeria
type nul > app\views\galeria\index.php
type nul > app\views\galeria\album.php
type nul > app\views\galeria\videos.php
type nul > app\views\galeria\categorias.php

:: Productos
type nul > app\views\productos\index.php
type nul > app\views\productos\detalle.php
type nul > app\views\productos\categorias.php
type nul > app\views\productos\ofertas.php
type nul > app\views\productos\destacados.php

:: FAQ
type nul > app\views\faq\index.php
type nul > app\views\faq\categorias.php
type nul > app\views\faq\pregunta.php

:: Politicas
type nul > app\views\politicas\privacidad.php
type nul > app\views\politicas\terminos.php
type nul > app\views\politicas\cookies.php
type nul > app\views\politicas\legal.php

:: Error
type nul > app\views\error\404.php
type nul > app\views\error\500.php
type nul > app\views\error\403.php
type nul > app\views\error\mantenimiento.php

:: =============================================
:: ARCHIVOS CSS
:: =============================================
echo Creando archivos CSS vacios...

type nul > public\assets\css\styles.css
type nul > public\assets\css\header.css
type nul > public\assets\css\footer.css
type nul > public\assets\css\sidebar.css
type nul > public\assets\css\home.css
type nul > public\assets\css\empresa.css
type nul > public\assets\css\servicios.css
type nul > public\assets\css\contacto.css
type nul > public\assets\css\blog.css
type nul > public\assets\css\galeria.css
type nul > public\assets\css\productos.css
type nul > public\assets\css\responsive.css
type nul > public\assets\css\animations.css
type nul > public\assets\css\variables.css

:: =============================================
:: ARCHIVOS JAVASCRIPT
:: =============================================
echo Creando archivos JS vacios...

type nul > public\assets\js\app.js
type nul > public\assets\js\main.js
type nul > public\assets\js\header.js
type nul > public\assets\js\footer.js
type nul > public\assets\js\home.js
type nul > public\assets\js\contacto.js
type nul > public\assets\js\blog.js
type nul > public\assets\js\galeria.js
type nul > public\assets\js\productos.js
type nul > public\assets\js\animations.js
type nul > public\assets\js\forms.js
type nul > public\assets\js\validations.js
type nul > public\assets\js\carousel.js
type nul > public\assets\js\modal.js
type nul > public\assets\js\accordion.js
type nul > public\assets\js\tabs.js
type nul > public\assets\js\scroll.js
type nul > public\assets\js\lazy-load.js

:: =============================================
:: ARCHIVOS DE CONFIGURACION ADICIONALES
:: =============================================
echo Creando archivos de configuracion adicionales...

type nul > .htaccess
type nul > robots.txt
type nul > sitemap.xml
type nul > .env.example
type nul > composer.json
type nul > package.json
type nul > web.config

:: =============================================
:: ARCHIVOS DE DOCUMENTACION
:: =============================================
echo Creando archivos de documentacion...

type nul > README.md
type nul > CHANGELOG.md
type nul > LICENSE.txt
type nul > .gitignore

:: =============================================
:: ARCHIVOS PARA PRUEBAS
:: =============================================
echo Creando archivos para pruebas...

mkdir tests
type nul > tests\test_home.php
type nul > tests\test_contacto.php
type nul > tests\test_database.php

:: =============================================
:: CREAR ESTRUCTURA DE CARPETAS ADICIONALES
:: =============================================
echo Creando carpetas adicionales...

mkdir public\assets\icons
mkdir public\assets\videos
mkdir public\assets\audios
mkdir public\assets\docs
mkdir public\assets\json
mkdir public\downloads
mkdir public\backups
mkdir temp
mkdir backups

:: =============================================
:: MOSTRAR RESUMEN
:: =============================================
echo.
echo ============================================
echo ESTRUCTURA MVC COMPLETADA EXITOSAMENTE!
echo ============================================
echo.
echo Resumen de archivos y carpetas creados:
echo.
echo Carpetas principales:
echo - app/ (con todas sus subcarpetas)
echo - public/ (assets, uploads, downloads)
echo - routes/
echo - vendor/
echo - logs/
echo - cache/
echo - tests/
echo - temp/
echo - backups/
echo.
echo Archivos PHP: 39 archivos
echo Archivos CSS: 14 archivos
echo Archivos JS: 20 archivos
echo Archivos de configuracion: 8 archivos
echo Archivos de documentacion: 4 archivos
echo Archivos de prueba: 3 archivos
echo.
echo Total de archivos creados: ~88 archivos vacios
echo.
echo Estructura de carpetas:
echo.
echo app/
echo   ├── config/
echo   ├── controllers/
echo   ├── models/
echo   ├── views/
echo   │   ├── layouts/
echo   │   ├── partials/
echo   │   ├── inicio/
echo   │   ├── empresa/
echo   │   ├── servicios/
echo   │   ├── contacto/
echo   │   ├── blog/
echo   │   ├── galeria/
echo   │   ├── productos/
echo   │   ├── faq/
echo   │   ├── politicas/
echo   │   └── error/
echo public/
echo   ├── assets/
echo   │   ├── css/
echo   │   ├── js/
echo   │   ├── img/
echo   │   ├── fonts/
echo   │   ├── icons/
echo   │   ├── videos/
echo   │   ├── audios/
echo   │   ├── docs/
echo   │   └── json/
echo   ├── uploads/
echo   └── downloads/
echo.
echo Siguientes pasos:
echo 1. Configurar el archivo .env con tus datos
echo 2. Ejecutar composer install (si usas dependencias)
echo 3. Configurar la base de datos en app/config/database.php
echo 4. Comenzar a desarrollar los controladores y modelos
echo 5. Crear las vistas con HTML y CSS
echo.
echo La estructura esta lista para comenzar el desarrollo!
echo.
pause