import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/mealUtils.js'

function MenuItem({ id, name, category, thumb, price }) {
  return (
    <article className="menu-card">
      <img className="menu-card__image" src={thumb} alt={name} loading="lazy" />
      <div className="menu-card__body">
        <header className="menu-card__header">
          <h3 className="menu-card__title">{name}</h3>
          <p className="menu-card__category">{category}</p>
        </header>
        <p className="menu-card__price">{formatPrice(price)}</p>
        <Link className="menu-card__link" to={`/meals/${id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default MenuItem
