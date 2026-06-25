# CBA Gestión de Tareas

## Descripción del Proyecto

CBA Gestión de Tareas es una aplicación web Full Stack desarrollada para gestionar proyectos y tareas colaborativas dentro de equipos de trabajo.

El sistema permite a los usuarios registrarse, iniciar sesión, crear proyectos, administrar tareas, realizar seguimiento del progreso y visualizar estadísticas generales mediante un dashboard.

Este proyecto fue desarrollado como evidencia de formación ADSO SENA aplicando conceptos de desarrollo web Full Stack, bases de datos en la nube, control de versiones y despliegue en producción.

---

# Objetivos

- Gestionar proyectos colaborativos.
- Administrar tareas asociadas a proyectos.
- Controlar usuarios mediante autenticación JWT.
- Visualizar métricas básicas mediante dashboard.
- Implementar operaciones CRUD completas.
- Utilizar una base de datos PostgreSQL en línea.
- Desplegar la aplicación en la nube.

---

# Tecnologías Utilizadas

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router DOM

## Backend

- Node.js
- Express
- TypeScript
- JWT
- bcryptjs

## Base de Datos

- PostgreSQL
- Supabase

## Despliegue

- Vercel (Frontend)
- Render (Backend)

## Control de Versiones

- Git
- GitHub

---

# Funcionalidades Implementadas

## Gestión de Usuarios

- Registro de usuarios
- Inicio de sesión
- Autenticación JWT
- Perfil de usuario
- Cierre de sesión

## Gestión de Proyectos

- Crear proyectos
- Listar proyectos
- Editar proyectos
- Eliminar proyectos
- Buscar proyectos

## Gestión de Tareas

- Crear tareas
- Editar tareas
- Eliminar tareas
- Asignar tareas a proyectos
- Definir prioridad
- Definir estado
- Definir fecha límite

## Dashboard

- Conteo total de proyectos
- Conteo total de tareas
- Conteo por estados
- Resumen general

## Validaciones

- Campos obligatorios
- Validaciones de formularios
- Manejo de errores
- Protección de rutas privadas

## Filtros

- Filtrar tareas por estado
- Filtrar tareas por prioridad
- Búsqueda de proyectos

---

# Modelo de Base de Datos

## CBAUsuarios

| Campo | Tipo |
|---------|---------|
| id | Integer |
| nombre | Varchar |
| email | Varchar |
| password | Varchar |
| rol | Varchar |
| created_at | Timestamp |

---

## CBAProyectos

| Campo | Tipo |
|---------|---------|
| id | Integer |
| nombre | Varchar |
| descripcion | Text |
| fecha_creacion | Timestamp |

---

## CBATareas

| Campo | Tipo |
|---------|---------|
| id | Integer |
| titulo | Varchar |
| descripcion | Text |
| estado | Varchar |
| prioridad | Varchar |
| fecha_limite | Date |
| proyecto_id | Integer |
| usuario_id | Integer |

---

# Relaciones

- Un usuario puede tener múltiples tareas.
- Un proyecto puede tener múltiples tareas.
- Una tarea pertenece a un proyecto.
- Una tarea puede estar asignada a un usuario.

---

# Instalación Local

## Clonar repositorio

```bash
git clone https://github.com/Andreyllanos/Gestion-de-Tareas.git
```

## Backend

```bash
cd backend
npm install
```

Crear archivo:

```env
PORT=3000
DATABASE_URL=TU_DATABASE_URL
JWT_SECRET=TU_JWT_SECRET
```

Ejecutar:

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
```

Ejecutar:

```bash
npm run dev
```

---

# Despliegue

## Frontend (Vercel)

URL:

https://gestion-de-tareas-eight.vercel.app

---

## Backend (Render)

URL:

https://gestion-de-tareas-3sel.onrender.com

---

# Capturas del Sistema

## Login

[Insertar captura]

---

## Registro

[Insertar captura]

---

## Dashboard

[Insertar captura]

---

## Gestión de Proyectos

[Insertar captura]

---

## Gestión de Tareas

[Insertar captura]

---

## Perfil de Usuario

[Insertar captura]

---

# Repositorio GitHub

https://github.com/Andreyllanos/Gestion-de-Tareas

---

# Autor

Andrey Llanos

Tecnólogo ADSO - SENA

---

# Estado del Proyecto

Proyecto finalizado y desplegado en producción.

Cumple con:

- CRUD completo
- Base de datos online
- Autenticación JWT
- Dashboard
- Relaciones entre entidades
- Filtros y búsqueda
- Validaciones
- GitHub
- Render
- Vercel
