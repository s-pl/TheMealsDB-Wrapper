import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MenuList from '../components/MenuList.jsx'
import { normalizeMeal } from '../utils/mealUtils.js'

const CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='

function CategoryMealsPage() {
  const { categoryName } = useParams()
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!categoryName) {
      return
    }

    let isMounted = true
    setIsLoading(true)
    setError('')

    fetch(`${CATEGORY_ENDPOINT}${encodeURIComponent(categoryName)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar los platos de la categoría seleccionada.')
        }
        return response.json()
      })
      .then((data) => {
        if (!data.meals?.length) {
          throw new Error('No hay platos disponibles para esta categoría.')
        }
        if (!isMounted) {
          return
        }
        const normalized = data.meals.map((meal) =>
          normalizeMeal(meal, { category: categoryName }),
        )
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
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [categoryName])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>{categoryName}</h1>
          <p>Selecciona un plato para conocer más detalles o añadirlo a tu pedido.</p>
        </div>
      </header>

      <MenuList
        items={meals}
        isLoading={isLoading}
        error={error}
        emptyMessage="No encontramos platos para esta categoría."
      />
    </section>
  )
}

export default CategoryMealsPage
