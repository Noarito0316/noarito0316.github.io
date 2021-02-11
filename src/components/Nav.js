import React from 'react';
import { Link} from 'react-router-dom'; 
import home from '../img/Home.png';
import projects from '../img/Projects.png';
import personal from '../img/Personal.png';


class Nav extends React.Component {
  render() {
    return (
      <nav>
      <Link to="/" ><img src={home} alt="Home"/></Link>
      <Link to="/projects"><img src={projects} alt="Projects"/></Link>
      <Link to="/personal"><img src={personal} alt="Personal"/></Link>
    </nav>
    )
  }
}

export default Nav;