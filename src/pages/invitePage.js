import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      <div className="profile-main">
        <div className='header profile'>
          <h2><span>{this.props.room}</span></h2>
        </div>
        <button onClick={this.onClickLink}>Сгенерировать новый токен</button>
        <div className='profile-info'>
          <div className='group'>
            <label>Имя:</label>
            <span>{this.props.username}</span><br/>
          </div>
          <a className="link-a" href={`https://bbb.trit.biz/${this.props.room}?jwt=${this.props.teacher}`}>Учительская ссылка</a><br/>
          <a className="link-a" href={`https://bbb.trit.biz/${this.props.room}?jwt=${this.props.student}`}>Студенческая ссылка</a>
        </div>
      </div>
    );
  }

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
