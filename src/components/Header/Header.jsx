import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import md5 from 'crypto-js/md5';
// import loginReducer from '../../redux/reducers/login';

class Header extends Component {
  getImageEmail = (email) => {
    const image = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${image}`;
    localStorage.setItem('url', url);
    return url;
  }

  render() {
    const {
      email,
      username,
      points,
    } = this.props;
    return (
      <div id="header">
        <img
          data-testid="header-profile-picture"
          src={ this.getImageEmail(email) }
          alt="Imagem do jogador"
        />
        <h3 data-testid="header-player-name">{ username }</h3>
        <h3 data-testid="header-score">{points}</h3>
      </div>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  username: state.loginReducer.name,
  points: state.player.score,
});

export default connect(mapStateToProps)(Header);
