# Sistema de Información Escolar (SIS) - Prueba Técnica

Este repositorio contiene el desarrollo de un Sistema de Información Escolar (SIS) fullstack para la inscripcion de materias de un colegio. 

## Tecnologías Utilizadas

### Backend (Node.js + Express + MySQL + MONGO DB)
  Node.js + Express.js → API REST para manejar la lógica del sistema.
  MySQL → Base de datos relacional para almacenar la información.
  JWT (JSON Web Token) → Autenticación segura para estudiantes y profesores.

### Frontend (React Native con Expo)

    React Native + Expo → Aplicación móvil para estudiantes y profesores.
    React Navigation → Manejo de navegación entre pantallas.

## Clonar el repositorio

git clone https://github.com/tu_usuario/sis-colegio.git
cd sis-colegio/backend

Instalar dependencias

npm install

Configurar variables de entorno (.env)
Iniciar servidor

    npm run dev

Frontend (React Native con Expo)

    Navegar al directorio del frontend

cd ../front

Instalar dependencias

npm install

Ejecutar en modo desarrollo

    npx expo start

📂 Estructura del Proyecto

sis-colegio/
│── back/          # API REST con Node.js y Express
│── front/         # Aplicación móvil con React Native
│── README.md         # Descripción del repositorio
