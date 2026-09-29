# Angular17ArquitecturaLimpia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server
1- Instale todas las dependencias del proyecto con el comando `npm install`
2- Si salen advertencias de seguridad, omitarlas, ya que dichas vulnerabilidades/metodos no se estan utilizando dentro del proyecto
3- Una vez instalado todo correctamente utilice el comando `npm run start` para iniciar el proyecto y este se debe 
   ejecutar en el link `http://localhost:4200/`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
1- Cambie el nombre del proyecto en el archivo package.json (Propiedad "name")
2- Cambie el nombre de la carpeta de salida de compilación, esta en el archivo angular.json posición:
    "architect"->"build"->"options"->"outputPath" y cambiar el nombre que esta despues del `dist/`
    ejemplo `dist/proyectPrueba`, esto generar la carpeta "dist" y dentro de esta la carpeta "proyectPrueba"
3- Lo demas se deja tal cual
4- Ejecutar el siguiente comando `npm run build` => Esto realiza la compilación con el environment de producción
5- El contenido de la carpeta browser es el que debe de ir en el servidor

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
