import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/meals', label: 'Platos' },
  { to: '/categories', label: 'Categorías' },
]

function NavBar() {
  const headerRef = useRef(null)
  const linkRefs = useRef([])

  useEffect(() => { // just trying out gsap animations
    const ctx = gsap.context(() => {  gsap.from(headerRef.current, {
        y: -16,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
      })

      gsap.from(linkRefs.current, {
        opacity: 0,
        y: 12,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power1.out',
        delay: 0.1,
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header className="app-header" ref={headerRef}>
      <div className="app-header__inner">
        <NavLink to="/" className="brand" aria-label="Inicio TheMealsDB Wrapper :D">
          TheMealsDB Wrapper :D
        </NavLink>
        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {LINKS.map((link, index) => (
              <li key={link.to} ref={(element) => (linkRefs.current[index] = element)}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
