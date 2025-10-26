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
          <h2>Animación con GSAP</h2>
          <p>La Navbar tiene una pequeña animación gracias a GSAP</p>
        </article>
        <article>
          <h2>IA Local</h2>
          <p>Si usas la versión de chrome 138 y tu PC es compatible, se descargará un modelo de IA proporcionado en la última versión de Chrome para traducir la descripción del plato.</p>
        </article>
        <article>
          <h2>Opciones para todos</h2>
          <p>Cuenta con filtros para poder ordenar por tu tipo de comida favorito</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
