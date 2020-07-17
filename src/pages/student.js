import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

const axios = require('axios').default;
const qs = require('query-string');
const jwt = require('trit-jwt-generator');

class TestPage extends React.Component {
  static propTypes = {
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      query: qs.parse(this.props.location.search),
      username: '',
      token: {},
    };
  }

  async componentDidMount() {
    await axios.get(`http://127.0.0.1:3000/token?inv=${this.state.query.inv}`).then(req => {
      this.setState({ token: req.data });
    });
  }

  render() {
    const { error } = this.props;
    const { username } = this.state;
    if (this.state.query.inv === this.state.token.Teacher) {
      return window.location.assign(`https://bbb.trit.biz/${this.state.token.Room}?jwt=${
        jwt.generateJWT({
          sub: 'bbb.trit.biz',
          room: this.state.token.Room,
          aud: 'bbb.trit.biz',
          iss: 'bbb.trit.biz',
        }, 'test', new Date(this.state.token.Alive), {
          user: {
            avatar: 'http://trit.biz/user/themes/trit2017/images/trit_sign.png',
            name: this.state.token.Moderator
          }
        })
      }`);
    }
    return (
      <div className="row">
        <form id='login-form' onSubmit={this.handleSubmit}>
          <div className='col s12 m4 offset-m4'>
            <div className='card'>
              <div className='card-action orange lighten-1 text-darken-1'>
                <h3>{this.state.token.Room}</h3>
              </div>
              <div className='card-content orange lighten-5'>
                <div className='form-field'>
                  {/* <h6>Модератор: {this.state.token.Moderator}</h6> */}
                  <h6>Ваше имя:</h6>
                  <input required type='text' name='username' value={username} id='username' onChange={this.onChangeUsername}/>
                  <button type='submit' className='waves-effect waves-light orange lighten-1 black-text btn-large' style={{
                    width: '100%',
                  }}>Перейти</button>
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

  handleSubmit = (event) => {
    event.preventDefault();
    return window.location.assign(
      `https://bbb.trit.biz/${this.state.token.Room}?jwt=${
        jwt.generateJWT({
          sub: 'bbb.trit.biz',
          room: this.state.token.Room,
          aud: 'bbb.trit.biz',
          iss: 'bbb.trit.biz',
        }, 'test', new Date(this.state.token.Alive), {
          user: {
            avatar: 'http://trit.biz/user/themes/trit2017/images/trit_sign.png',
            name: this.state.username
          }
        })
      }`
    );
  };
}
export default connect()(TestPage);
