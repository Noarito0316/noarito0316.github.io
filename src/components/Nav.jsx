import React from 'react';
import { Link } from 'react-router-dom';
import home from '../img/Home.png';
import projects from '../img/Projects.png';
import personal from '../img/Personal.png';

const links = [
  { to: '/', label: 'Home', img: home },
  { to: '/projects', label: 'Projects', img: projects },
  { to: '/personal', label: 'Personal', img: personal },
];

function Nav() {
  return (
    <nav className='navegationcontainer'>
      {links.map((link, index) => (
        <Link to={link.to} key={index}>
          <div className="navfix">
            <img src={link.img} alt={link.label} />
            <p className="infoPopUp">{link.label}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
