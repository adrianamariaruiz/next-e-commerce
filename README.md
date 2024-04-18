# Descripción
Éste es un E-commerce realizado con:
- Next.js, 
- Zustand para el manejo de los estados
- Tailwind para los estilos
- Postgresql como base de datos
- Prisma para hacer las peticiones SQL
- Docker

## Correr en dev
1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Istalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
6. Correr el proyecto ```npm run dev```

## Correr en producción
