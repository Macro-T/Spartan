#INFO

**"authors"**: [
---------
    {
      "name": **"Misael Taveras",**
      "email": *"macrot29@gmail.com"*
    },
--------
      {
      "name": **"Elvis Vanderpool"**,
      "email": *"elvisvanderpool@gmail.com"*
    }
  ]

***

Este es un proyecto cerrado que busca crear un *Sistema de Descarga* y subida dde archivos basado en la potente plataforma de **NodeJS**
Aun le falta mucho por hacer, pero es el comienzo de algo que será Enorme

#Antes de:
Debes tener [NodeJS] y [Mongodb] instalado y coriendo en el puerto por defecto
##Si deseas
Dentro de <code>./routes/index.js</code> hay una ruta comentada en la Lineas <pre>13-27</pre> al descomentarlas y correr el servidor, al ingresar en la URI ** <code>localhost:3000/api/masive</code> ** se agregara una entrada enlazada al archivo: <code>./public/program/1.txt</code> como muestra o demo para ver el funcionamiento de nuestra *API*

#Como usar
Simplemente clonar este [repositorio], puedes hacer tu propio brantch. O descargarlo en [Zip]
 + Usar <code> cd spartan && npm install && bower install</code> para descargar las dependencias.
 + Abrir tu terminal y poner a correr, si no est'a corriendo ya, el servicio de [Mongodb]
 + Correr la Aplicación con [NodeJS] o con [Nodemon] (que es lo que prefiero ;) )
 + La aplicación empezará a correr en <pre>localhost:3000</pre> solo debes entrar ahí con tu Navegador favorito

#Algunas cosillas.
 + Estoy utilizadon a [Materialize] como FrameWork FrontEnd y [Express] para el servidor en el Backend
 + [Sass] es mi preprocedador de CSS
 + Falta algo de Documentacion :(
 
[Materialize]: http://materilizecss.com
[Express]: http://expressjs.com
[Sass]: http://sass-lang.com
[NodeJS]: http:://nodejs.org
[Mongodb]: http://mongodb.org
[Nodemon]: https://github.com/remy/nodemon
[repositorio]:https://github.com/Macro-T/Spartan.git
[Zip]: https://github.com/Macro-T/Spartan/archive/412590caec1043492c02042cb64232544794c652.zip
