import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php'

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    fetch(CATEGORIES_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar las categorías.')
        }
        return response.json()
      })
      .then((data) => {
        if (!data.categories?.length) {
          throw new Error('No hay categorías disponibles ahora mismo.')
        }
        if (!isMounted) {
          return
        }
        const normalized = data.categories.map((category) => ({
          id: category.idCategory,
          name: category.strCategory,
          thumb: category.strCategoryThumb,
          description: category.strCategoryDescription?.split('\n')[0]?.trim() ?? '',
        }))
        setCategories(normalized)
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
  }, [])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Categorías</h1>
          <p>Explora platos agrupados por estilo culinario y descubre recomendaciones.</p>
        </div>
      </header>

      {isLoading && <p className="status-message">Cargando categorías...</p>}
      {error && <p className="status-message status-message--error">{error}</p>}

      {!isLoading && !error && (
        <div className="category-grid" aria-live="polite">
          {categories.map((category) => (
            <article className="category-card" key={category.id}>
              <img
                className="category-card__image"
                src={category.thumb}
                alt={category.name}
                loading="lazy"
              />
              <div className="category-card__body">
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <Link className="secondary-button" to={`/categories/${encodeURIComponent(category.name)}`}>
                  Ver platos
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CategoriesPage
