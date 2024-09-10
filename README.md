# Macks

El proyecto que elegí fue crear una página inspirada en la interfaz de los canales de [Slack](https://app.slack.com/) en Modo Oscuro. Utilicé Figma para diseñar la distribución de los elementos y luego implementé el diseño en código. Me enfoqué en replicar la sensación de organización y claridad que caracteriza a Slack, utilizando una paleta de colores oscuros y una tipografía legible.

Para el resto de las páginas, seguí las pautas del documento de consignas del TP Final. Uno de los mayores desafíos fue lograr una buena adaptación del diseño a diferentes tamaños de pantalla, pero utilicé técnicas de diseño responsive para resolver este problema. El resultado final es una página web con una apariencia moderna y profesional, que facilita la navegación y la interacción del usuario.

## Installation

Usa el entorno de [Node Js](https://nodejs.org/en/download/package-manager) para ver el proyecto o entra [AQUI](https://slack-clone-macks-v2.vercel.app/) para ver el resulado final hasta ahora.

```bash
npm install
npm run dev
```

## What was used to make this happen

Vite para desplegar el proyecto.

[React-Router-Dom](https://reactrouter.com/en/main) es el principal enrutador.

[React Icons](https://react-icons.github.io/react-icons/) para todos los iconos que estan a la vista.

[JSON Generator](https://json-generator.com/#) me ayudo con la generacion random de contenido JSON.

[React Confirm Alert](https://www.npmjs.com/package/react-confirm-alert) para confirmacion de eliminacion.

El resto del codigo fue hecho a mano en CSS, JavaSript y React.

## The most difficult situations

Lo mas dificil fue hacer responsivo la pagina donde esta el workspace y poder ocultarlo y para cuando hay que desplegarlo se vea mas o menos decente. Eso fue lo que me llevo mas tiempo. Y que la pequeña flechita girara de forma suave para desplegar el menu de canales y que vuelva a su posision inicial.
Muchas cosas fui agregando sin tenerlo planeado. Eso realmente fue lo mas dificil, reordenar el codigo para poder agregar nuevas funcionalidades, como por ejemplo el buscador de palabras en el chat. Por eso el desorden del codigo en la pagina del workspace.jsx.
Aprendi que es muy importante planear bien las funcionalidades con anterioridad asi el codigo se mantiene mucho mas ordenado y legible. Muchas variables no tienen el nombre que tienen que tener pero me diverti y aprendi mucho con este proyecto. Lo mas importante es que funciona.

## License

FREE
