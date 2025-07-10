import React from 'react';
import leo from '../img/leonnardoLair.jpeg';


class Home extends React.Component {
  render() {
    return (
    <section className="bodycontainer">
    <h1 id="inicio">Leonnardo Lair Tavares Gomes</h1>
    <img src={leo} id="leoimg" alt="Imagem de Perfil"/>

    <p>Cursando o <strong>3° Periodo de Sistema de Informação</strong> e 
        Também gosta de se distrair com jogos coloridos e jogar um RPGzin </p>

    <p><i>~I'm trying to exist</i></p>

    <a target="" href="https://github.com/Noarito0316">Perfil do Github </a>

    </section>
      );
  }
}
export default Home;
