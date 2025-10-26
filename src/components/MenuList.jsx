import MenuItem from './MenuItem.jsx'

function MenuList({ items, isLoading, error, emptyMessage = 'No hay platos disponibles.' }) {
  if (isLoading) {
    return <p className="status-message">Cargando platos...</p>
  }

  if (error) {
    return <p className="status-message status-message--error">{error}</p>
  }

  if (!items.length) {
    return <p className="status-message">{emptyMessage}</p>
  }

  return (
    <section className="menu-list" aria-live="polite">
      {items.map((item) => (
        <MenuItem key={item.id} {...item} /> // ...items means spreading all item properties as props
      ))}
    </section>
  )
}

export default MenuList
