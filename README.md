# Api McFly
Api hecha con Node y el framework Koajs.

### Persistencia
Se ha de utilizar una base de datos Mongo.  Se puede elegir si se tiene una BD en local o en MongoLab.
```sh
# mongolab
MLAB_USER=xxxx
MLAB_PASSWORD=xxxxx
MLAB_URI=xxxxx.mlab.com
MLAB_PORT=123456
MLAB_DBNAME=xxxx

# mongo local 
MONGO_LOCAL_URI=localhost
MONGO_LOCAL_PORT=27017
MONGO_LOCAL_DBNAME=api_mcfly
```
### Configuración
La configuración de la app es tan sólo renombrar el archivo .env.sample por .env y en ese archivo añadir las configuraciones necesarias de la BD

### Instalación y uso
Instalar las dependencias 
```sh
git clone https://github.com/kiviev/nodeApiMacFly.git
$ cd nodeApiMacFly
$ npm install -d
$ npm start
```


