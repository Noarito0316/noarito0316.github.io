import React from 'react';
import leo from '../img/leonnardoLair.jpeg';


class Home extends React.Component {
  render() {
    return (
<body>
    <section className="bodycontainer">
    <h1 id="inicio">Leonnardo Lair Tavares Gomes</h1>
    <img src={leo} id="leoimg" alt="Imagem de Perfil"/>

    <p>Cursando o <strong>8° Periodo de Engenharia da computação</strong> e <strong>Estudante da Trybe.</strong> 
        Também gosta de se distrair com jogos coloridos </p>

    <p><i>~Ser Persistente e ser Cabeça dura são dois lados da mesma moeda!</i></p>

    <a target="" href="https://github.com/Noarito0316">Perfil do Github </a>

    </section>
</body>
      );
  }
}
export default Home;
