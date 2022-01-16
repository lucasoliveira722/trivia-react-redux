import React, { Component } from 'react';
import sonic from '../../assets/sonicGirando.gif';
import sonicApresenta from '../../assets/sonic.png';
import './BarraInfoStyle.css';

class BarraInfo extends Component {
  render() {
    return (
      <nav>
        <img className="sonic-girando" src={ sonic } alt="Sonic Girando" />
        <h2 className="text-animation"> Jogo de Perguntas e Respostas Trívia! </h2>
        <img
          className="sonic-apresentando"
          src={ sonicApresenta }
          alt="Sonic Apresentado o Jogo"
        />
      </nav>
    );
  }
}

export default BarraInfo;
