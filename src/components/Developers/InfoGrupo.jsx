import React, { Component } from 'react';
import './InfoGrupoStyle.css';
import tonis from '../../assets/perfilLinkedin.jpeg';
import antonio from '../../assets/antonio.png';
import lucas from '../../assets/lucas.png';
import jonatas from '../../assets/jonatas.jpeg';
import guilherme from '../../assets/gui.png';
import gabriel from '../../assets/gabi.png';

class infoGrupo extends Component {
  render() {
    return (
      <div className="container-main-developers">

        <img src={ tonis } alt="Tonis Developer" />
        <img src={ antonio } alt="Antonio Developer" />
        <img src={ lucas } alt="Lucas Developer" />
        <img src={ jonatas } alt="Lucas Developer" />
        <img src={ guilherme } alt="Lucas Developer" />
        <img src={ gabriel } alt="Gabriel Developer" />

      </div>
    );
  }
}

export default infoGrupo;
