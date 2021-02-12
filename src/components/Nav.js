import React from 'react';
import { Link} from 'react-router-dom'; 
import home from '../img/Home.png';
import projects from '../img/Projects.png';
import personal from '../img/Personal.png';


class Nav extends React.Component {
  render() {
    return (
      <nav>
      <Link to="/">
        <div className="navfix">
          <img src={home} alt="Home"/>
          <p className="infoPopUp">Home</p>
          </div>
        </Link>
      <Link to="/projects">
        <div className="navfix">
          <img src={projects} alt="Projects"/>
          <p className="infoPopUp">Projects</p>
          </div>
        </Link>
      <Link to="/personal">
        <div className="navfix">
          <img src={personal} alt="Personal"/>
          <p className="infoPopUp">Personal</p>
          </div>
        </Link>
    </nav>
    )
  }
}

export default Nav;