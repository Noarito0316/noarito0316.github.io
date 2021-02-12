import React from 'react';

class Personal extends React.Component {
  render() {
    return (
      <section className="bodycontainer">
            <h2 id="like">Personal Interest</h2>

    <a target="" href="https://www.youtube.com/watch?v=nZVpt2zPdNo">
      Link para uma musica que gosto bastante
      </a>
<div>
     musica a baixo
</div>
<iframe 
id="video" 
className="video"
title="Megaman X" 
width="420" 
height="315" 
src="https://www.youtube.com/embed/nZVpt2zPdNo">
</iframe>
<script src="script.js" language="javascript" type="text/javascript"></script>
      </section>
    )
  }
}

export default Personal;