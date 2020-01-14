## Requisitos

- Nodejs 10.17 en adelante

Se tomo como ejemplo el [repositorio](https://gitlab.agetic.gob.bo/agetic/empresa-digital-backend/tree/empresa_v0.1.0) para conectarse con Ciudadania Digital y servir datos fake 

La configuración de las variables de entorno se encuentran en el archivo .env, con la cual se deben crear 2 archivos para los ambientes de desarrollo y produccion

``` bash
touch .env.development.local
touch .env.production.local
```
Esto para que cuando se compile o se trabaje en un ambiente de desarrollo tome las variables correspondientes

## Instalando el proyecto

Siga los siguientes pasos:

### 1. Instalando dependencias

``` bash
npm install
```
