import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from '../trivia.png';
// import './Login.css';
import { login } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      enterDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableEnterButton = this.enableEnterButton.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.clickConfig = this.clickConfig.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.enableEnterButton);
  }

  onHandleClick() {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;

    dispatch(login({ email, name }));

    history.push('/game');
    // console.log('Feito');
  }

  clickConfig() {
    const { history } = this.props;

    history.push('/config');
    // console.log('Feito');
  }

  enableEnterButton() {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, name } = this.state;
    if ((email.match(mailformat)) && name.length !== 0) {
      this.setState({
        enterDisabled: false,
      });
    } else {
      this.setState({
        enterDisabled: true,
      });
    }
  }

  render() {
    const {
      email,
      name,
      enterDisabled,
    } = this.state;
    return (
      <>
        <header className="Login-header">
          {/* <img src={ logo } className="Login-logo" alt="logo" /> */}
          <h1>Trivia</h1>
        </header>
        <br />
        <br />
        <br />
        <br />
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              type="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ enterDisabled }
            onClick={ this.onHandleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.clickConfig }
          >
            Config
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
