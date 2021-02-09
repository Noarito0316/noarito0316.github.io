import React from 'react';
import leo from '../img/leonnardoLair.jpeg'

class Home extends React.Component {
  render() {
    return (
<body>
    <header>
        <div id="home"><a target="" href="https://noarito0316.github.io">Inicio</a></div>
    </header>
    <h1 id="inicio">Leonnardo Lair Tavares Gomes</h1>
        <h2>REACT</h2>

    <img src={leo} id="leoimg" alt="Imagem de Perfil"/>

    <p>Cursando o <strong>8° Periodo de Engenharia da computação</strong> e <strong>Estudante da Trybe.</strong> 
        Também gosta de se distrair com jogos coloridos </p>

    <p><i>~Ser Persistente e ser Cabeça dura são dois lados da mesma moeda!</i></p>

    <a target="" href="https://github.com/Noarito0316">Perfil do Github </a>

    <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#projects">Projetos</a></li>
        <li><a href="#like">Coisa que gosto</a></li>
        <li><a href="#fim">Fim da Pagina</a></li>
    </ul>
    <div id="projects">
        <h1>Projetos da trybe</h1>
        <p id="projectlist5">Bloco 5</p>
        <ul id="block_5">
            <li><a class="block_5" target="" href="https://noarito0316.github.io/meme-generator/">Meme Generator</a></li>
            <li><a class="block_5" target="" href="https://noarito0316.github.io/pixel-art/">Pixel Art</a></li>
            <li><a class="block_5" target="" href="https://noarito0316.github.io/to-do-list/">To do List</a></li>
        </ul>
    </div>

    <h2 id="like">Coisas que gosto</h2>

    <p>
        <a target="" href="https://www.youtube.com/watch?v=nZVpt2zPdNo">Link para uma musica que gosto
            bastante</a>
         musica a baixo
    </p>
    <iframe id="video" title="Megaman X" width="420" height="315" src="https://www.youtube.com/embed/nZVpt2zPdNo"></iframe>
    <a href="#inicio">Volta para o incio</a>
    <p id="fim">Fim</p>
    <script src="script.js" language="javascript" type="text/javascript"></script>
</body>
      );
  }
}
export default Home;
