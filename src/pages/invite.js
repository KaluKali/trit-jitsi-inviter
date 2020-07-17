import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CLICK_JITSI_PRIVATE_LINK } from '../store/actionTypes';


class InvitePage extends React.Component {
  static propTypes = {
    clickLink: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className='col s12 m4 offset-m4'>
          <div className='card'>
            <div className='card-action orange lighten-1 text-darken-1'>
              <h3>{this.props.room}</h3>
            </div>
            <div className='card-content orange lighten-5'>
              <div className='form-field'>
                <p>Модератор: {this.props.username}</p>
                <label>Учительская ссылка</label><br/>
                <input required type='text' readOnly onClick={this.handleSelect} value={`http://${window.location.hostname}:${window.location.port}/stud?inv=${this.props.teacher}`}/><br/>
                <label>Студенческая ссылка</label><br/>
                <input required type='text' readOnly onClick={this.handleSelect} value={`http://${window.location.hostname}:${window.location.port}/stud?inv=${this.props.student}`}/><br/>
                <button onClick={this.onClickLink} className='btn-large waves-effect waves-light orange lighten-1 black-text' style={{
                  width: '100%'
                }}>Создать новую ссылку</button>
              </div><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSelect = (e) => {
    e.target.select();
  };

  onClickLink = () => {
    this.props.clickLink();
  };
}

const mapStateToProps = (state) => (
  {
    username: state.username,
    room: state.room,
    teacher: state.teacher,
    student: state.student,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    clickLink: () => dispatch({ type: CLICK_JITSI_PRIVATE_LINK })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(InvitePage);
