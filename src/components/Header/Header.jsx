import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getImageEmail = (email) => {
    const image = md5(email).toString();
    return `https://www.gravatar.com/avatar/${image}`;
  }

  render() {
    const {
      email,
      username,
    } = this.props;
    return (
      <div id="header">
        <img
          data-testid="header-profile-picture"
          src={ this.getImageEmail(email) }
          alt="Imagem do jogador"
        />
        <h3 data-testid="header-player-name">{ username }</h3>
        <h3 data-testid="header-score">0</h3>
      </div>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  username: state.loginReducer.name,
});

export default connect(mapStateToProps)(Header);
