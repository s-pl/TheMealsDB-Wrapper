# Restaurante Mar y Sol — SPA de menú interactivo

Aplicación de una sola página construida con React y Vite para practicar consumo de APIs, enrutamiento y gestión de estados de carga y error. El menú se alimenta de datos públicos de [TheMealDB](https://www.themealdb.com) e incorpora precios generados en cliente.

## Características

- Listado de platos con nombre, imagen, categoría y precio inventado.
- Carga de datos mediante `fetch` y `useEffect`, con estados de *loading* y error.
- Navegación con React Router: inicio, listado completo, categorías, detalle del plato y rutas dinámicas.
- Búsqueda por nombre y filtro por categoría en el listado principal.
- Diseño responsivo con énfasis en jerarquía visual y accesibilidad básica.
- Animaciones de entrada suaves con GSAP.

## Requisitos previos

- Node.js 18 o superior.
- npm (incluido con Node).

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo en `http://localhost:5173`.
- `npm run build`: genera la versión optimizada para producción en `dist`.
- `npm run preview`: sirve el build generado para verificación rápida.

## Endpoints utilizados

- `https://www.themealdb.com/api/json/v1/1/search.php?s=` — búsqueda general de platos.
- `https://www.themealdb.com/api/json/v1/1/categories.php` — listado de categorías.
- `https://www.themealdb.com/api/json/v1/1/filter.php?c={categoria}` — platos por categoría.
- `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}` — detalle de un plato.

## Estructura principal

- `src/components/` — componentes reutilizables (`NavBar`, `MenuList`, `MenuItem`).
- `src/pages/` — páginas y rutas (`HomePage`, `MealsPage`, `CategoriesPage`, etc.).
- `src/utils/` — utilidades para normalizar datos y calcular precios.

## Notas de desarrollo

- Los precios se calculan localmente a partir del `idMeal` para mantener consistencia entre sesiones.
- Puedes extender la aplicación con buscador avanzado, ordenación por precio u otras mejoras de usabilidad.
