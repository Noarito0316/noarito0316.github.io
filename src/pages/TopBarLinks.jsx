import { Link, useLocation } from 'react-router-dom'
import LoginButton from '../components/GoogleButton'
import UserInfo from '../components/UserInfo'


export default function TopBarLinks() {
  const location = useLocation()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Promoções', path: '/cdltemplate/promocoes' },
    { label: 'Vagas', path: '/cdltemplate/vagas' },
    { label: 'Notícias', path: '/cdltemplate/noticias' },
    { label: 'Sorteios', path: '/cdltemplate/sorteios' },
    { label: 'Admin', path: '/admin' }
  ]

  return (
    <div className="topbar">
        <LoginButton />
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={location.pathname === link.path ? 'active' : ''}
        >
          {link.label}
        </Link>
        
      ))}
        <UserInfo />
    </div>
  )
}
