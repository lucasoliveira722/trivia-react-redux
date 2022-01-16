import React, { Component } from 'react';
import mulherTwo from '../../assets/mulherTwo.gif';
import mulher from '../../assets/mulherOne.gif';
import './BarraInfoStyle.css';

class BarraInfo extends Component {
  render() {
    return (
      <nav>
        {/* <img className="sonic-girando" src={ sonic } alt="Sonic Girando" /> */}
        <img className="img-padrao" src={ mulherTwo } alt="mulherTwo question one" />
        <h2 className="text-animation">
          Ha!! Trívia? É Jogo de Perguntas e Respostas.
        </h2>
        {/* <p>Trívia</p> */}
        <img className="img-padrao" src={ mulher } alt="mulher question one" />
      </nav>
    );
  }
}

export default BarraInfo;
