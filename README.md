# restaurants-searcher
Buscador de restaurantes recomendados segun criterios de busqueda

### # Proyecto de Recomendación de Restaurantes
Este es un proyecto de Node.js con NestJS y MongoDB que te permite recomendar restaurantes basados en diferentes criterios, como calificaciones, especialidades, ingredientes e ingredientes excluidos. El proyecto se encuentra contenerizado en Docker y también incluye una documentación

### Requisitos previos
Asegúrate de tener instalados los siguientes componentes en tu máquina:

- Docker: [Instrucciones de instalación de Docker](https://docs.docker.com/get-docker/)
- Docker Compose [Instrucciones de instalación de Docker compose](https://docs.docker.com.zh.xy2401.com/v17.12/compose/install/)
- Node.js (v14 o superior)
github

### Configuración del proyecto
- Clona este repositorio en tu máquina local:
`$ git clone https://github.com/sazlain/restaurants-searcher`

- Navega hasta el directorio raíz del proyecto:
`$ cd restaurants-searcher`

- Instalar dependencias del proyecto:
`$ npm install`

- Crear el archivo .env del proyecto con las siguientes variables (Valores para entorno de desarrollo):
DB_TYPE=mongodb
DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=admin
DB_PASSWORD=password
DB_DATABASE=find-food

#APP_ENVIROMENT= in docker container must use dev||prod
#APP_ENVIROMENT= for local use must use local
APP_ENVIROMENT=local

- Ejecucion del proyecto para entorno de desarrollo contruir el paquete distribuible:
`$ npm run start:dev`

+ Ejecicion del proyecto para entorno de produccion contruir el paquete distribuible y iniciar el contenedor docker:
  + `$ npm run build`
  + `$ docker-compose up -d`


### Informacion del servicio
Method  | GET | 
Url  | http://localhost:3000/searcher | 
parametro 1 | filters  | Cadena de texto separada por ',' con los criterios de la busqueda. Los criterios de busquedas pueden ser la especialidad del restaurant, tipo de comidas, ingredientes requeridos
parametro 2 | excludes | Cadena de texto separada por ',' con criterios de ingredientes excluidos


Ejemplo de request: http://localhost:3000/searcher?filters=pizza&excludes=carne
###Algoritmo de recomendacion
El algoritmo implementado para las recomendaciones esta basado en puntajes de criterios asociados a los restaurantes y a los de platos de los mismos.

Criterios del algoritmo:
- Calificacion del restaurante: los restaurantes tienen una calificacion de 1 - 5, la puntuacion para la recomendacion sumara 50 puntos porcentuales referenciados a la calificacion.

- Calificacion de los platos del menu: cada plato tiene una calificacion de 1 - 5,  la puntuacion para la recomendacion sumara 20 puntos porcentuales referenciados a la calificacion promedio de todos los platos del restaurante.

- Especialidad del restaurante: si en los criterios de busqueda aparece el nombre de la especialidad el algoritmo sumara 200 puntos.

- Especialidad secundaria del restaurante: si en los criterios de busqueda aparece el nombre de la especialidad secundaria el algoritmo sumara 150 puntos.

- Atributos del restaurante: si en los criterios de busqueda aparecen algunos de los atributos del restaurante se sumara 10 puntos por cada coincidencia.

- Ingredientes de los platos: si en los criterios de busqueda aparecen algunos de los ingredientes de los platos del restaurante se sumara 10 puntos por cada coincidencia.

- Ingredientes excluidos de los platos: si en los criterios de busqueda aparecen algunos de los ingredientes excluidos de los platos del restaurante se sumara 200 puntos por cada coincidencia.

####El resultado del algoritmo sera la recondacion del restaurante que haya acumulados mas puntos ya que este seria el de mayor coincidencia con los criterios de la busqueda
   


## Autor
##### Azlain Saavedra
