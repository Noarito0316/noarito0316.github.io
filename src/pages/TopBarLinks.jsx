import { Link, useLocation } from 'react-router-dom'

export default function TopBarLinks() {
  const location = useLocation()

  const links = [
    { label: 'Promoções', path: '/cdltemplate/promocoes' },
    { label: 'Vagas', path: '/cdltemplate/vagas' },
    { label: 'Notícias', path: '/cdltemplate/noticias' },
    { label: 'Sorteios', path: '/cdltemplate/sorteios' },
    { label: 'Admin', path: '/admin' }
  ]

  return (
    <div className="topbar">
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={location.pathname === link.path ? 'active' : ''}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
