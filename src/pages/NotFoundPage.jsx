import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page">
      <h1>Página no encontrada</h1>
      <p>No pudimos encontrar el contenido solicitado. Revisa la URL o vuelve al inicio.</p>
      <Link className="primary-button" to="/">
        Ir al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage
