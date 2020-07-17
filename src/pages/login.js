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
      <div className='row'>
        <form id='login-form' onSubmit={this.handleSubmit}>
          <div className='col s12 m4 offset-m4'>
            <div className='card'>
              <div className='card-content orange lighten-5'>
                <div className='form-field'>
                  <h6>Ваше имя</h6>
                  <input required type='text' name='username' value={username} id='username' onChange={this.onChangeUsername}/>
                </div><br/>
                <div className='form-field'>
                  <h6>Название комнаты</h6>
                  <input className='orange lighten-5' required type='text' name='room' value={room} id='room' onChange={this.onChangeRoom}/>
                </div><br/>
                <div className='form-field'>
                  <button type='submit' className='waves-effect waves-light orange lighten-1 black-text btn-large' style={{
                    width: '100%'
                  }}>создать</button>
                </div><br/>
                <div className='error-message' hidden={!error}>
                  {error}
                </div>
              </div>
            </div>
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
