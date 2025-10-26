const CURRENCY_FORMATTER = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

export const formatPrice = (price) => CURRENCY_FORMATTER.format(price) 


// Because the API does not provide prices, we compute a random price based on the meal ID - Just so the main page and the detail page have some price to show :)

export const price = (id) => {
  const base = 7.5 // Base price
  const spread = (id % 1800) / 120 // Variable component
  return Math.round((base + spread) * 100) / 100 // Return price rounded to 2 decimal places
}

// export a json object with normalized meal data

export const normalizeMeal = (meal) => ({
  id: meal.idMeal,
  name: meal.strMeal,
  category: meal.strCategory ?? 'Sin categoría',
  thumb: meal.strMealThumb,
  price: price(meal.idMeal),
})
