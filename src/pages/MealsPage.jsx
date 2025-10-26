import { useEffect, useMemo, useState } from 'react'
import MenuList from '../components/MenuList.jsx'
import { normalizeMeal } from '../utils/mealUtils.js'

const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

function MealsPage() {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [categories, setCategories] = useState(['todas'])

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    fetch(MEALS_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el menú. Inténtalo de nuevo más tarde.')
        }
        return response.json()
      })
      .then((data) => {
        // if there is no meals in data, throw error
        if (!data.meals?.length) {
          throw new Error('No se encontraron platos disponibles en este momento.')
        }
        // if the component is unmounted, do nothing
        if (!isMounted) {
          return
        }
        // save in a const variable the normalized meals | for every meal -> a json object with normalized meal data
        const normalized = data.meals.map((meal) => normalizeMeal(meal))

        // set the meals state with the normalized meals
        setMeals(normalized)
      })
      .catch((fetchError) => {
        if (!isMounted) {
          return
        }
        setError(fetchError.message)
      })
      .finally(() => {
        if (isMounted) { 
        // stop showing loading state 
          setIsLoading(false)
        }
      })

    return () => {
       
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const unique = new Set(meals.map((meal) => meal.category)) // extract unique categories from meals
    setCategories(['todas', ...unique]) // set categories state with 'todas' and the unique categories
  }, [meals] ) // run this effect whenever meals change

  const filteredMeals = meals.filter((meal) => selectedCategory === 'todas' ? true : meal.category === selectedCategory,) // filter by selected category with a ternary operator
  .filter((meal) => meal.name.toLowerCase().includes(searchQuery.toLowerCase())) // filter by search query (case insensitive)

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Nuestros platos</h1>
          <p>
            Explora la carta completa y descubre sugerencias del chef. Filtra por categoría o
            busca por nombre.
          </p>
        </div>
        <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="field">
            <span className="field__label">Buscar</span>
            <input
              className="field__input"
              type="search"
              name="name"
              placeholder="Lo que quieras buscar"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Categoría</span>
            <select
              className="field__input"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'todas' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </label>
        </form>
      </header>

      <MenuList
        items={filteredMeals}
        isLoading={isLoading}
        error={error}
        emptyMessage="No hay platos que coincidan con tu búsqueda."
      />
    </section>
  )
}

export default MealsPage
