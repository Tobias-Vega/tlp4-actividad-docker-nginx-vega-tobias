# Proyecto: Gestor de Tareas (Frontend + Backend)

Este repositorio contiene una aplicación de ejemplo con frontend (Vite + React + TypeScript) y backend (Node.js + Express + TypeScript). También incluye configuración para Nginx y docker-compose para desplegar los servicios.

## Requisitos

- Node.js >= 18 (recomendado LTS)
- npm (v9+) o yarn
- Docker & Docker Compose (opcional, para ejecutar en contenedores)
- Git (para clonar el repositorio)

## Estructura del repositorio

- `frontend/` - aplicación React (Vite, TypeScript)
- `backend/` - servidor Node.js/Express (TypeScript)
- `nginx/` - configuración de Nginx usada en el contenedor
- `docker-compose.yml` - orquesta frontend, backend y nginx

## Configuración rápida (sin Docker)

Recomendada para desarrollo iterativo.

1. Clona el repositorio:

```powershell
git clone https://github.com/Tobias-Vega/tlp4-actividad-docker-nginx-vega-tobias
cd tlp4-actividad-docker-nginx-vega-tobias
```

2. Backend — instalar dependencias y ejecutar

```powershell
cd backend
npm install
npm run dev
```

3. Frontend — instalar dependencias y ejecutar

```powershell
cd ../frontend
npm install
npm run dev
```

## Uso con Docker / docker-compose

El proyecto incluye un `docker-compose.yml` para levantar frontend, backend y nginx.

1. Levantar la imagen del Backend y Frontend en las carpetas correspondientes

```powershell
cd ../backend
docker build -t my-backend ./backend

cd ../frontend
docker build -t my-frontend ./frontend
```

2. Construir y levantar los servicios:

```powershell
docker compose up --build -d
```

2. Accede a la app a través de Nginx (según la configuración) o directamente en los puertos expuestos. Consulta `docker-compose.yml` para los puertos mapeados.

Detener y eliminar contenedores:

```powershell
docker compose down
```