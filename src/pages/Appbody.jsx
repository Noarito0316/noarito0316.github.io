import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Home from './Home'
import Personal from './Personal'
import Projects from './Projects'
import Categoria from './Category'
import PostEditor from '../components/PostEditor'
import SessionLoader from './Login'
import TopBarLinks from './TopBarLinks'

export default function AppContent() {
    const location = useLocation()

    const rotasComCssEspecial = ['/admin', '/noticias', '/vagas', '/promocoes', '/sorteios']
    const usarLayoutColorido =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/cdltemplate/') &&
    rotasComCssEspecial.some((categoria) => location.pathname.includes(categoria))

  return (
    <div className={usarLayoutColorido ? 'fundo-padrao' : 'fundo-roxo'}>
      <Nav />
      <TopBarLinks />
      <Routes>
        <Route element={<SessionLoader />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/admin" element={<PostEditor />} />
        <Route path="/cdltemplate/:nome" element={<Categoria />} />
      </Routes>
    </div>
  )
}
