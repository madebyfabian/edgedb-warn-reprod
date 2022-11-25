# zingio App

## Installing

- Install EdgeDB locally
- `edgedb project init`
- `npm run generate-types:edgedb`

## After changing a `dbschema/*.esdl` file

- `npm run edgedb-migration:create`
- `npm run edgedb-migration:apply`
