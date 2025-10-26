import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="page home-page">
      <div className="home-hero">
        <h1>Recopilación de sabores mundiales de mano de TheMealsDB</h1>
        <p>
          Descubre platos caseros elaborados con ingredientes de temporada y una carta que
          cambia según la pesca del día. Explora nuestro menú digital y reserva tus favoritos.
        </p>
        <div className="home-actions">
          <Link className="primary-button" to="/meals">
            Ver menú completo
          </Link>
          <Link className="secondary-button" to="/categories">
            Explorar por categorías
          </Link>
        </div>
      </div>
      <div className="home-highlights">
        <article>
          <h2>Experiencia cuidada</h2>
          <p>Aplicamos principios de usabilidad para que encuentres tu plato ideal sin complicaciones.</p>
        </article>
        <article>
          <h2>Ingredientes locales</h2>
          <p>Trabajamos con productores cercanos para garantizar frescura y sabor en cada bocado.</p>
        </article>
        <article>
          <h2>Opciones para todos</h2>
          <p>Filtra por categoría o busca tu plato favorito para organizar la próxima comida en casa.</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
