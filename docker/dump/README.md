# Dump de datos para desarrollo

Colocae un dump generado con `mongodump` para que MongoDB lo restaure automáticamente al levantar el contenedor.

Estructura esperada (ejemplo):

```
docker/dump/
  chocodevs/
    productos.bson
    productos.metadata.json
    usuarios.bson
    usuarios.metadata.json
```

Notas:
- Los archivos dentro de `docker/dump/` se montan en `/docker-entrypoint-initdb.d` del contenedor de Mongo y se ejecutan al iniciar.
- Para generar un dump: `mongodump --uri="<MONGODB_URI>" --db chocodevs --out docker/dump`
- En producción, evitar montar esta carpeta para no sobreescribir datos.

