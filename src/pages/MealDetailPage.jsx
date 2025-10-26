import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { normalizeMeal, formatPrice } from '../utils/mealUtils.js'

const DETAIL_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

function MealDetailPage() {
    const { mealId } = useParams()
    const [meal, setMeal] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!mealId) {
            return
        }

        let isMounted = true
        const loadMeal = async () => {
            setIsLoading(true)
            setError('')

            try {
                const response = await fetch(`${DETAIL_ENDPOINT}${mealId}`)
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información del plato seleccionado.')
                }

                const data = await response.json()
                const [mealData] = data.meals ?? []
                if (!mealData) {
                    throw new Error('El plato solicitado no está disponible.')
                }

                if (!isMounted) {
                    return
                }

                // https://developer.chrome.com/docs/ai/translator-api?hl=es-419

                let translatedInstructions = mealData.strInstructions ?? ''
                if ('Translator' in globalThis) { // if the translator api is available download the AI model and translate
                    try {
                        const translator = await globalThis.Translator.create({
                            sourceLanguage: 'en',
                            targetLanguage: 'es',
                        })
                        translatedInstructions = await translator.translate(translatedInstructions)
                    } catch {
                        translatedInstructions = mealData.strInstructions ?? '' // use original instructions on error
                    }
                }

                const normalized = {
                    ...normalizeMeal(mealData),
                    area: mealData.strArea,
                    instructions: translatedInstructions,
                    tags: mealData.strTags?.split(',').filter(Boolean) ?? [],
                    youtube: mealData.strYoutube,
                }

                setMeal(normalized)
            } catch (fetchError) {
                if (!isMounted) {
                    return
                }
                setError(fetchError.message)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadMeal()

        return () => {
            isMounted = false
        }
    }, [mealId])

    if (isLoading) {
        return (
            <section className="page">
                <p className="status-message">Cargando detalle del plato...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className="page">
                <p className="status-message status-message--error">{error}</p>
                <Link className="secondary-button" to="/meals">
                    Volver al menú
                </Link>
            </section>
        )
    }

    if (!meal) {
        return null
    }

    return (
        <section className="page meal-detail">
            <header className="page-header">
                <div>
                    <h1>{meal.name}</h1>
                    <p>
                        {meal.category} • {meal.area}
                    </p>
                </div>
                <div className="detail-price">{formatPrice(meal.price)}</div>
            </header>

            <div className="meal-detail__layout">
                <img
                    className="meal-detail__image"
                    src={meal.thumb}
                    alt={meal.name}
                    loading="lazy"
                />
                <div className="meal-detail__content">
                    <h2>Preparación</h2>
                    <p>{meal.instructions}</p>

                    {meal.tags.length > 0 && (
                        <div className="meal-detail__tags">
                            <h3>Etiquetas</h3>
                            <ul>
                                {meal.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="detail-actions">
                        <Link className="primary-button" to="/meals">
                            Volver al menú
                        </Link>
                        <Link className="secondary-button" to="/categories">
                            Ver otras categorías
                        </Link>
                        {meal.youtube && (
                            <a className="secondary-button" href={meal.youtube} target="_blank" rel="noreferrer">
                                Ver video
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MealDetailPage
