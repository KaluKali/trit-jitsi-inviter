import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    logIn: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      room: '',
    };
  }

  render() {
    const { isAuthorized } = this.props;

    if (isAuthorized) {
      return <Redirect to='/invite'/>;
    }

    const { username, room } = this.state;
    const { error } = this.props;

    return (
      <div id='login'>
        <form id='login-form' onSubmit={this.handleSubmit}>
          <label>Имя Фамилия</label>
          <input required type='text' name='username' value={username} onChange={this.onChangeUsername} />
          <label>Название конференции</label>
          <input required type='text' name='room' value={room} onChange={this.onChangeRoom} />
          <button type="submit">Получить</button>
          <div className='error-message' hidden={!error}>
            {error}
          </div>
        </form>
      </div>
    );
  }

  onChangeUsername = (event) => {
    const { target: { value } } = event;

    this.setState({ username: value });
  };

  onChangeRoom = (event) => {
    const { target: { value } } = event;

    this.setState({ room: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, room } = this.state;
    this.props.logIn(username, room);
  }
}

const mapStateToProps = (state) => (
  {
    isAuthorized: Boolean(state.username),
    error: state.errorMessage
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    logIn: (username, room) => dispatch({ type: 'LOG_IN', payload: { username, room } }),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
